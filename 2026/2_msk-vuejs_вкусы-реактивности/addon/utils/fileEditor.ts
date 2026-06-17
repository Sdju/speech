/**
 * Утилиты для работы с файлами и определением позиций изменений
 */

export interface FileLocation {
  filePath: string
  lineNumber: number
  columnStart: number
  columnEnd: number
  content: string
}

export interface TimelineChange {
  path: string // Путь к значению (например: "timeline.0.point1")
  stepIndex: number
  propertyName: string
  oldValue: any
  newValue: any
  location?: FileLocation
  slideInfo?: {
    filePath: string
    slideStartLine: number
  }
}

/**
 * Определяет местоположение значения в YAML файле
 */
export function findValueLocation(
  fileContent: string,
  path: string,
  stepIndex: number,
  propertyName: string
): FileLocation | null {
  try {
    if (!fileContent) {
      console.warn('File content is empty, cannot find location')
      return null
    }
    
    const lines = fileContent.split('\n')
    
    // Ищем начало timeline
    let timelineStartLine = -1
    let timelineIndent = 0
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.trim() === 'timeline:') {
        timelineStartLine = i
        timelineIndent = line.indexOf('timeline:')
        break
      }
    }
    
    if (timelineStartLine === -1) {
      console.warn('Timeline not found in file')
      return null
    }
    
    // Ищем нужный шаг timeline
    let currentStep = -1
    let stepStartLine = -1
    let stepIndent = timelineIndent + 2 // Обычно шаги имеют отступ +2
    
    for (let i = timelineStartLine + 1; i < lines.length; i++) {
      const line = lines[i]
      const trimmed = line.trim()
      
      // Если строка пустая, пропускаем
      if (!trimmed) continue
      
      // Если отступ меньше или равен timeline, значит мы вышли из timeline
      const currentIndent = line.length - line.trimStart().length
      if (currentIndent <= timelineIndent && trimmed) {
        break
      }
      
      // Если это новый шаг (начинается с -)
      if (trimmed.startsWith('-') && currentIndent === timelineIndent + 2) {
        currentStep++
        if (currentStep === stepIndex) {
          stepStartLine = i
          stepIndent = currentIndent + 2 // Свойства имеют отступ +2 от шага
          break
        }
      }
    }
    
    if (stepStartLine === -1) {
      console.warn(`Step ${stepIndex} not found in timeline`)
      return null
    }
    
    // Ищем нужное свойство в шаге
    for (let i = stepStartLine + 1; i < lines.length; i++) { // Начинаем со следующей строки после шага
      const line = lines[i]
      const trimmed = line.trim()
      
      // Если строка пустая, пропускаем
      if (!trimmed) continue
      
      // Если отступ меньше stepIndent, значит мы вышли из шага
      const currentIndent = line.length - line.trimStart().length
      if (currentIndent < stepIndent && trimmed) {
        break
      }
      
      // Ищем свойство
      if (trimmed.startsWith(`${propertyName}:`)) {
        const colonIndex = line.indexOf(':')
        return {
          filePath: '', // Будет заполнено позже
          lineNumber: i + 1, // Нумерация с 1
          columnStart: colonIndex + 1,
          columnEnd: line.length,
          content: line
        }
      }
    }
    
    console.warn(`Property ${propertyName} not found in step ${stepIndex}`)
    return null
  } catch (error) {
    console.error('Error finding value location:', error)
    return null
  }
}

/**
 * Генерирует новую строку с обновленным значением
 */
export function generateUpdatedLine(
  originalLine: string,
  newValue: any,
  propertyName: string
): string {
  const colonIndex = originalLine.indexOf(':')
  if (colonIndex === -1) {
    console.warn('No colon found in line:', originalLine)
    return originalLine
  }
  
  const indent = originalLine.substring(0, colonIndex + 1)
  const valueStr = formatValueForYaml(newValue)
  
  return `${indent} ${valueStr}`
}

/**
 * Форматирует значение для записи в YAML
 */
export function formatValueForYaml(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'string') {
    // Если строка содержит специальные символы, заключаем в кавычки
    if (value.includes(':') || value.includes('"') || value.includes("'") || value.includes('\n')) {
      return `"${value.replace(/"/g, '\\"')}"`
    }
    return value
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatValueForYaml).join(', ')}]`
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

/**
 * Создает описание изменения для консоли
 */
export function createChangeDescription(change: TimelineChange): string {
  const { path, stepIndex, propertyName, oldValue, newValue, location } = change
  
  let description = `🔄 Изменение в timeline:\n`
  description += `   📍 Путь: ${path}\n`
  description += `   📊 Шаг: ${stepIndex + 1}\n`
  description += `   🏷️  Свойство: ${propertyName}\n`
  description += `   📤 Было: ${formatValueForYaml(oldValue)}\n`
  description += `   📥 Стало: ${formatValueForYaml(newValue)}\n`
  
  if (location) {
    description += `   📄 Файл: строка ${location.lineNumber}\n`
    description += `   📝 Текущая строка: "${location.content}"\n`
    description += `   ✏️  Новая строка: "${generateUpdatedLine(location.content, newValue, propertyName)}"\n`
  }
  
  return description
}

/**
 * Симулирует обновление файла с использованием данных Slidev
 */
export async function simulateFileUpdateWithSlidev(
  change: TimelineChange, 
  slideMeta: { filepath: string; start: number }
): Promise<void> {
  try {
    console.log('🔄 Обработка изменения с использованием Slidev данных:', {
      change,
      filepath: slideMeta.filepath,
      slideStart: slideMeta.start
    })
    
    // Сохраняем информацию о слайде
    change.slideInfo = {
      filePath: slideMeta.filepath,
      slideStartLine: slideMeta.start
    }
    
    // Получаем содержимое файла
    const fileContent = await getFileContent(slideMeta.filepath)
    
    if (!fileContent) {
      console.warn('⚠️  Не удалось получить содержимое файла')
      return
    }
    
    const location = findValueLocation(fileContent, change.path, change.stepIndex, change.propertyName)
    
    if (location) {
      location.filePath = slideMeta.filepath
      change.location = location
    }
    
    const description = createChangeDescription(change)
    console.log(description)
    
    // Дополнительная информация для разработчика
    console.group('🔧 Техническая информация')
    console.log('Изменение:', change)
    console.log('Информация о слайде:', change.slideInfo)
    console.log('Местоположение:', location)
    console.log('Новая строка:', location ? generateUpdatedLine(location.content, change.newValue, change.propertyName) : 'N/A')
    console.groupEnd()
  } catch (error) {
    console.error('Error simulating file update with Slidev:', error)
  }
}

/**
 * Получает содержимое файла (симуляция)
 * В реальной реализации здесь будет чтение файла с диска
 */
export async function getFileContent(filePath: string): Promise<string> {
  try {
    console.warn(`⚠️  Получение содержимого файла ${filePath} не реализовано`)
    console.warn('В реальной реализации здесь будет чтение файла с диска')
    
    // Для демонстрации возвращаем пример содержимого
    return `---
layout: center
timeline:
  - block1: 'outline outline-2 outline-[#CCCCCC88]'
    block2: '-blur-hidden fx'
    block3: '-blur-hidden outline-[#00000088]'
    opacity: 0.5
    scale: 1.0
  - block1: 'outline-[#00000088]'
    block2: 'outline outline-2 outline-[#CCCCCC88]'
    opacity: 0.8
    scale: 1.2
---

# Слайд 1

Содержимое первого слайда

---

# Слайд 2

Содержимое второго слайда

---

# Слайд 3

Содержимое третьего слайда`
  } catch (error) {
    console.error('Error getting file content:', error)
    return ''
  }
}

/**
 * Симулирует обновление файла (выводит в консоль)
 */
export async function simulateFileUpdate(change: TimelineChange, filePath: string): Promise<void> {
  try {
    // Получаем содержимое файла
    const fileContent = await getFileContent(filePath)
    
    if (!fileContent) {
      console.warn('⚠️  Не удалось получить содержимое файла')
      return
    }
    
    const location = findValueLocation(fileContent, change.path, change.stepIndex, change.propertyName)
    
    if (location) {
      location.filePath = filePath
      change.location = location
    }
    
    const description = createChangeDescription(change)
    console.log(description)
    
    // Дополнительная информация для разработчика
    console.group('🔧 Техническая информация')
    console.log('Изменение:', change)
    console.log('Местоположение:', location)
    console.log('Новая строка:', location ? generateUpdatedLine(location.content, change.newValue, change.propertyName) : 'N/A')
    console.groupEnd()
  } catch (error) {
    console.error('Error simulating file update:', error)
  }
}
