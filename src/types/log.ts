export interface log {
  count: number
  data: {
    id: number
    operName: string
    operTime: string
    title: string
    remark: string
  }[]
}