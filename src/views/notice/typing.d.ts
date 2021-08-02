export type Notice = {
  count: number
  data: {
    id: number
    title: string
    createTime: string
    content: string
  }[]
}