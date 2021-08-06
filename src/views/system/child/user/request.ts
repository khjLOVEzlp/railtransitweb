import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Search } from "utils/typings";
import { User } from './typings'

/* 查询所有用户信息 */
export const useUserAll = () => {
  const client = useHttp()
  return useQuery(['userlist'], () => client(`user/allList`, { method: "POST" }))
}

/* 查询没有账号的用户 */
export const useUserList = () => {
  const client = useHttp()
  return useQuery(['userlist'], () => client(`user/userlist`, { method: "POST" }))
}

/*
分页查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<User>(['user', cleanObject(params)], () =>
    client(`user/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`user/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('userlist')
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
  return useMutation((params: any) => client(`user/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('userlist')
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
  return useMutation((id: number) => client(`user/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('userlist')
    },
    onError: () => {
    }
  })
}

/* 
查询详情
*/
export const useUserDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['userDetail', id], () => client(`user/get/${id}`), {
    enabled: Boolean(id),
  })
}

/*
查询用户信息
*/
export const useInfo = (id?: number) => {
  const client = useHttp()
  return useQuery(['info', id], () => client(`user/getSelf/${id}`), {
    enabled: Boolean(id),
  })
}
