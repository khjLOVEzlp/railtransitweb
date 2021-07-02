import qs from 'qs'
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '..';
import { useUrlQueryParam } from '../../hook/useUrlQueryParam';
import { useHttp } from '../http';

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "index", "size"]);
  return [
    useMemo(
      () => ({ ...param, index: Number(param.index) || undefined, size: Number(param.size) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['lineRoad', cleanObject(params)], () => client(`lineRoad/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`lineRoad/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
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
  return useMutation((params: any) => client(`lineRoad/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
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
  return useMutation((id: number) => client(`lineRoad/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('lineRoad')
    },
    onError: () => {
    }
  })
}

/* 详情 */
export const useLineDetail = (id: number) => {
  const client = useHttp()
  return useQuery(['lineDetail', id], () => client(`line/get/${id}`))
}
