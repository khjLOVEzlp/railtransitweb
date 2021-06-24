import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '../../../../utils'
import { useHttp } from '../../../../utils/http'

/*
分页查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['plan', cleanObject(params)], () => client(`plan/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`plan/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
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
  return useMutation((params: any) => client(`plan/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
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
  return useMutation((id: number) => client(`plan/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
    },
    onError: () => {
    }
  })
}

/* 根据线路id获取站点 */
export const useSite = (id?: number) => {
  const client = useHttp()
  return useQuery(['plan', id], () => client(`linePlatform/allList?lineId=${id}`, { method: "POST" }))
}

/* 发布计划 */
export const useSharePlan = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`plan/share`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
    },
    onError: () => {
    }
  })
}

/* 反馈 */
export const useFeedBack = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`plan/shareBack`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('plan')
    },
    onError: () => {
    }
  })
}

/* 查看反馈信息 */
export const useShare = (id: number) => {
  const client = useHttp()
  return useQuery(['share', id], () => client(`plan/getShare/${id}`))
}