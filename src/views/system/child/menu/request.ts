import qs from 'qs'
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils';
import { useUrlQueryParam } from 'hook/useUrlQueryParam';
import { useHttp } from 'utils/http';
import { Search } from 'utils/typings';
import { Menu } from './typings';

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

const fuc = (data: any) => {
  if (data && data.length > 0) {
    data.forEach((item: any) => {
      item.title = item.name
      item.key = item.id
      item.children = fuc(item.childMenu)
    });
  } else {
    data = []
  }
  return data
}

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Menu>(['menu', cleanObject(params)], async () => {
    const data = await client(`menu/getAll?${qs.stringify(cleanObject(params))}&type=1`, { method: "POST" })
    fuc(data.data)
    return data
  }
  )
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`menu/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
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
  return useMutation((params: any) => client(`menu/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
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
  return useMutation((id: number) => client(`menu/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('menu')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useMenuDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['menuDetail', id], () => client(`menu/get/${id}`), {
    enabled: Boolean(id),
  })
}
