import qs from 'qs'
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSetUrlSearchParam, useUrlQueryParam } from '../../hook/useUrlQueryParam';
import { cleanObject } from '..'
import { useHttp } from '../http'

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

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["user", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useInit(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

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
export const useInit = (params: any) => {
  const client = useHttp()
  return useQuery(['user', cleanObject(params)], () => client(`user/list?${qs.stringify(cleanObject(params))}`, { method: "POST" }))
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
