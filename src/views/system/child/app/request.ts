import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "utils/http";

/* 分页查询APP */
export const useApp = (data: any) => {
  const client = useHttp();
  return useQuery(["app", data], () =>
    client(`appVersionController/getAppVersionList`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  );
};

/* 新增APP */
export const useAppAdd = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) =>
      client(`appVersionController/createAppVersionInfo`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("app");
      },
    }
  );
};

/* 修改APP */
export const useAppUpdate = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) =>
      client(`appVersionController/updateVersion`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("app");
      },
    }
  );
};

/* 查询APP详情 */
export const useAppDetail = (id: number) => {
  const client = useHttp();
  return useQuery([""], () =>
    client(`appVersionController/getAppVersionInfo/${id}`)
  );
};
