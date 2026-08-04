export interface TimelineStep {
  $duration?: number
  $clicksAlias?: string | string[]
  [key: string]: unknown
}
