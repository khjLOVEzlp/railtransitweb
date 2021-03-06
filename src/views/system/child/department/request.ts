import qs from 'qs'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { department } from "types/department";

/**
 * 查询
 */

const fuc = (data: any) => {
  if (data && data.length > 0) {
    data.forEach((item: any) => {
      item.title = item.name
      item.value = item.id
      item.children = fuc(item.departmentList)
    });
  } else {
    data = []
  }
  return data
}

/**
 * 查询登录人员拥有的组织机构信息及人员信息
 *  */
export const useInitDepartment = () => {
  const client = useHttp()
  return useQuery<department>(['department'], async () => {
    const data = await client(`department/getDepartment`)
    fuc(data.data)
    return data
  }
  )
}

export const useInit = (params?: any) => {
  const client = useHttp()
  return useQuery<department>(['department', cleanObject(params)], async () => {
    const data = await client(`department/getDepartment?${qs.stringify(cleanObject(params))}`)
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
  return useMutation((params: any) => client(`department/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
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
  return useMutation((params: any) => client(`department/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
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
  return useMutation((id: number) => client(`department/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('department')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useDepartmentDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['departmentDetail', id], () => client(`department/get/${id}`), {
    enabled: Boolean(id),
  })
}
