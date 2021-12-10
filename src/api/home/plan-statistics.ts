import qs from "qs";
import { useQuery } from "react-query";
import { cleanObject, getType } from "utils";
import { useHttp } from "utils/http";
import { useHomeContext } from "views/home";

/*首页计划统计*/
export const usePlanStatistics = () => {
  const client = useHttp();
  return useQuery(["planStatistics"], async () => {
    const data = await client(`report/webPlan`);
    data.data.forEach((key: any) => {
      key["name"] = getType(key["type"]);
    });
    return data;
  });
};

/*首页计划统计分页查询*/
export const usePlanPagination = (params?: any) => {
  const p = params.type ? true : false;
  const client = useHttp();
  return useQuery(
    ["planPagination", cleanObject(params)],
    async () => {
      const data = await client(
        `report/webPlanMore?${qs.stringify(cleanObject(params))}`,
        { method: "POST" }
      );
      data.data.forEach((key: { [key: string]: unknown }, index: number) => {
        key["key"] = index;
      });
      return data;
    },
    {
      enabled: p,
    }
  );
};

/*
 * 计划统计弹框
 * */

export const usePlanModal = () => {
  const { planId, setPlanId } = useHomeContext();

  const open = (id: number) => setPlanId(id);

  const close = () => setPlanId(undefined);

  return {
    ModalOpen: Boolean(planId),
    open,
    close,
    planId,
  };
};
