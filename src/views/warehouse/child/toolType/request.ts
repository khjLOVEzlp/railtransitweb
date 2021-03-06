import qs from "qs";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

/* 
查全部
*/
export const useWarehouse = () => {
  const client = useHttp();
  return useQuery(["warehouse"], () =>
    client(`warehouse/listAll`, { method: "POST" })
  );
};

/*
查询
 */
export const useInit = (params: any) => {
  const client = useHttp();
  return useQuery(["warehouse", cleanObject(params)], () =>
    client(`warehouse/list?${qs.stringify(cleanObject(params))}`, {
      method: "POST",
    })
  );
};

/* 
新增
*/
export const useAdd = () => {
  const queryClient = useQueryClient();
  const client = useHttp();
  return useMutation(
    (params: any) =>
      client(`warehouse/save`, {
        method: "POST",
        body: JSON.stringify(params),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("warehouse");
      },
      onError: () => {},
    }
  );
};

/* 
修改
*/
export const useMod = () => {
  const queryClient = useQueryClient();
  const client = useHttp();
  return useMutation(
    (params: any) =>
      client(`warehouse/update`, {
        method: "POST",
        body: JSON.stringify(params),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("warehouse");
      },
      onError: () => {},
    }
  );
};

/* 
删除
*/
export const useDel = () => {
  const queryClient = useQueryClient();
  const client = useHttp();
  return useMutation((id: number) => client(`warehouse/delete/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("warehouse");
    },
    onError: () => {},
  });
};

/*
查询详情
*/
export const useToolTypeDetail = (id?: number) => {
  const client = useHttp();
  return useQuery(["toolTypeDetail", id], () => client(`warehouse/get/${id}`), {
    enabled: Boolean(id),
  });
};

/* 根据仓库id获取库存信息 */
export const useViewToolDetail = (params: any) => {
  const client = useHttp();
  return useQuery(["viewToolDetail", cleanObject(params)], () =>
    client(`warehouse/getMaterial?${qs.stringify(cleanObject(params))}`, {
      method: "POST",
    })
  );
};

/* 根据仓库id获取库存信息 */
export const useGetMaterialDetail = (type: number, warehouseId: number) => {
  const client = useHttp();
  return useQuery(
    ["GetMaterialDetail", type, warehouseId],
    () =>
      client(
        `warehouse/getMaterialDetail?type=${warehouseId}&warehouseId=${type}`,
        { method: "POST" }
      ),
    {
      enabled: Boolean(type) && Boolean(warehouseId),
    }
  );
};

/* 工具详情 */
export const useToolDetail = (id: number) => {
  const client = useHttp();
  return useQuery(["detail"], () => client(`material/get/${id}`), {
    enabled: Boolean(id),
  });
};

/* 修改物资信息 */
export const useModMaterial = () => {
  const queryClient = useQueryClient();
  const client = useHttp();
  return useMutation(
    (params: any) =>
      client(`material/update`, {
        method: "POST",
        body: JSON.stringify(params),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("material");
      },
      onError: () => {},
    }
  );
};
