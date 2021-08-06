import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from 'utils/typings';
import { Person } from './typings';

/*
查询所有
 */
export const usePerson = () => {
  const client = useHttp()
  return useQuery(['person'], async () => {
    const data = await client(`person/getAllPerson`)
    data.data.forEach((key: any, index: number) => {
      key["key"] = index + 1
    })
    return data
  })
}

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Person>(['person', cleanObject(params)], () => client(`person/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
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

/*
查询详情
*/
export const usePersonDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['personDetail', id], async () => {
    const data = await client(`person/get/${id}`)
    data.data.number = parseInt(data.data.number)
    return data
  }, {
    enabled: Boolean(id),
  })
}
