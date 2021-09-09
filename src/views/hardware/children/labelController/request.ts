import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils/index'
import { useHttp } from 'utils/http'
import { Lab } from './typings';
import { Search } from 'utils/typings';
import { useAuth } from 'context/auth-context';

/*
查询
 */
export const useInit = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<Lab>(['label', cleanObject(params)], () => client(`hardware/label/list`, { method: "POST", body: JSON.stringify(params) }))
}

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient()
  const client = useHttp()
  return useMutation((params: any) => client(`hardware/label/save`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('label')
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
  return useMutation((params: any) => client(`hardware/label/update`, { method: "POST", body: JSON.stringify(params) }), {
    onSuccess: () => {
      queryClient.invalidateQueries('label')
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
  return useMutation((id: number) => client(`hardware/label/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('label')
    },
    onError: () => {
    }
  })
}

/*
查询详情
*/
export const useLabDetail = (id?: number) => {
  const client = useHttp()
  return useQuery(['labDetail', id], () => client(`hardware/label/get/${id}`), {
    enabled: Boolean(id),
  })
}

/* 导入标签弹框 */

export const useImportModal = () => {
  const { drawer, setDrawer } = useAuth()

  const open = () => setDrawer(true)

  const close = () => setDrawer(false)

  return {
    ModalOpen: drawer === true,
    open,
    close
  }
}