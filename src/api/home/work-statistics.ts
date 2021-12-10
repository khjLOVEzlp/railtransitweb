import qs from "qs"
import { useQuery } from "react-query"
import { cleanObject, getType } from "utils"
import { useHttp } from "utils/http"
import { useHomeContext } from "views/home"

/*首页作业统计*/
export const useTaskStatistics = () => {
    const client = useHttp()
    return useQuery(['taskStatistics'], async () => {
      const data = await client(`report/webWork`)
      data.data.forEach((key: any) => {
        key["name"] = getType(key["type"])
      })
      
      return data
    })
  }
  
  /*首页作业统计分页查询*/
  export const useTaskPagination = (params?: any) => {
    const p = params.type ? true : false
    const client = useHttp()
    return useQuery(['taskPagination', cleanObject(params)], async () => {
      const data = await client(`report/webWorkMore?${qs.stringify(cleanObject(params))}`, { method: "POST" })
      data.data.forEach((key: { [key: string]: unknown }, index: number) => {
        key["key"] = index
      })
      return data
    }, {
      enabled: p
    })
  }
  
  
  
  /*
  * 作业统计弹框
  * */
  
  export const useTaskModal = () => {
    const { taskId, setTaskId } = useHomeContext()
  
    const open = (id: number | undefined) => setTaskId(id)
  
    const close = () => setTaskId(undefined)
  
    return {
      ModalOpen: Boolean(taskId),
      open,
      close,
      taskId,
    }
  }