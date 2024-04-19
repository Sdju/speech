<script setup lang="ts">
import {computed} from 'vue';
import FolderIcon from '~icons/ph/folder-simple-duotone'
import TsIcon from '~icons/tabler/brand-typescript'
import VueIcon from '~icons/uim/vuejs'

const iconsList = {
  folder: FolderIcon,
  typescript: TsIcon,
  vue: VueIcon
}

type FileDescription = { type: string, name: string, highlighted?: boolean }

const props = defineProps<{
  files: FileDescription[]
  classes?: {
    default?: string
    highlighted?: string
  }
}>()

function fileListToFileFullList(list: FileDescription[]) {
  const nodes = {}
  const fullTree = []

  list.forEach(item => {
    let dir = fullTree
    let id = ''
    const parts = item.name.split('/')
    parts.slice(0, -1).forEach((part: string) => {
      id += `/${part}`
      if (!nodes[id]) {
        const file = {
          type: 'folder',
          id,
          name: part,
          content: []
        }
        nodes[id] = file
        dir.push(file)
      }

      dir = nodes[id].content
    })


    const file = {
      ...item,
      id: item.name,
      name: parts.at(-1)
    }
    nodes[file.id] = file
    dir.push(file)
  })

  const result = []
  const walker = (folder, level = 0) => folder.forEach((file) => {
    result.push({
      ...file,
      level
    })
    if ((file.type === 'folder') && (file.content)) {
      walker(file.content, level + 1)
    }
  })
  walker(fullTree, 0)

  return result
}

const highlightedClasses = computed(() => props.classes?.highlighted || 'c-white')
const defaultClasses = computed(() => props.classes?.default || 'opacity-80')

const fileList = computed(() => fileListToFileFullList(props.files))
const outputList = computed(() => {
  return fileList.value.map((file) => ({
    icon: iconsList[file.type],
    title: file.name,
    id: file.id,
    style: {paddingLeft: `${19 * file.level}px`},
    class: file.highlighted ? highlightedClasses.value : defaultClasses.value
  }))
})

</script>
<template>
  <div class="bg-[var(--slidev-code-background)] my-[4px] rd-[4px] p-2 text-xs line-height-[150%] c-[#CCC]">
    <div
      v-for="file in outputList"
      :key="file.id"
      :class="file.class"
      :style="file.style"
    >
      <component :is="file.icon" mr="2px"/>
      {{ file.title }}
    </div>
  </div>
<!--  <div class="bg-[var(&#45;&#45;slidev-code-background)] my-[4px] rd-[4px] p-2 text-xs line-height-[150%] c-[#CCC]">-->
<!--    <div opacity-80><ph-folder-simple-duotone mr="2px"/> src</div>-->
<!--    <div opacity-80 class="blur-[1px]"><ph-folder-simple-duotone mr="2px" ml-5 /> assets</div>-->
<!--    <div opacity-80><ph-folder-simple-duotone mr="2px" ml-5 /> renderer</div>-->
<!--    <div c-white><tabler-brand-typescript mr="2px" ml-10 /> index.ts</div>-->
<!--    <div opacity-80 class="blur-[1px]"><uim-vuejs mr="2px" ml-5 /> App.vue</div>-->
<!--    <div opacity-80 class="blur-[1px]"><tabler-brand-typescript mr="2px" ml-5 /> main.ts</div>-->
<!--  </div>-->
</template>