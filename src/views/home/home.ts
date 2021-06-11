import { useQuery } from 'react-query'
import { useHttp } from "../../utils/http"

/*
查询
 */
export const useLineIndex = () => {
  const client = useHttp()
  return useQuery(['line'], () => client(`line/getIndex`, { method: "POST" }))
}