export type Alarm = {
  count: number
  data: {
    id: number
    workName: string
    type: number
    toolName: string
    groupName: string
    relieveTime: string
    labelNum: string
    personName: string
    warnTime: string
    content: string
  }[]
}