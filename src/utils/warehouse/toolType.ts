import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from '../index'
import { useHttp } from '../http'
import {useUrlQueryParam} from "../../hook/useUrlQueryParam";
import {useMemo} from "react";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "index", "size", "type"]);
  return [
    useMemo(
      () => ({ ...param, index: Number(param.index) || undefined, size: Number(param.size) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

/* 
查全部
*/
export const useWarehouse = () => {
  const client = useHttp()
  return useQuery(['warehouse'], () => client(`warehouse/listAll`, { method: "POST" }))
}

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['warehouse', cleanObject(params)], () => client(`warehouse/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`warehouse/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('warehouse')
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
  return useMutation((params: any) => client(`warehouse/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('warehouse')
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
  return useMutation((id: number) => client(`warehouse/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('warehouse')
    },
    onError: () => {
    }
  })
}

/* 根据仓库id获取库存信息 */
export const useMaterial = (params: any) => {
  const client = useHttp()
  return useQuery(['material', cleanObject(params)], () => client(`warehouse/getMaterial?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
}

/* 工具详情 */
export const useToolDetail = (id: number) => {
  const client = useHttp()
  return useQuery(['detail'], () => client(`material/get/${id}`))
}

/* 修改物资信息 */
export const useModMaterial = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`material/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('material')
    },
    onError: () => {
    }
  })
}