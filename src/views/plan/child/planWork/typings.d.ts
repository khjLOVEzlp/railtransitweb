export type PlanWork = {
  count: number
  data: {
    id: number
    name: string
    leaderName: string
    beginTime: string
    endTime: string
    lineName: string
    pinName: string
    pleaseName: string
    status: number
    isWarn: number
    remark: string
  }[]
}
