import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '../../utils'
import { useHttp } from '../../utils/http'

/*
查询所有
 */
export const usePerson = () => {
  const client = useHttp()
  return useQuery(['warehouse'], () => client(`person/getAllPerson`))
}

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['role', cleanObject(params)], () => client(`person/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`person/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('person')
    },
    onError: () => {
    }
  })
}

/* 
修改
*/
export const useMod = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`person/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('person')
    },
    onError: () => {
    }
  })
}

/* 
删除
*/
export const useDel = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((id: number) => client(`person/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('person')
    },
    onError: () => {
    }
  })
}
