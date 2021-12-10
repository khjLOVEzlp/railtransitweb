import qs from "qs";
import { useQuery } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useHomeContext } from "views/home";

export const Type = (type: number) => {
  switch (type) {
    case 1:
      return "遗忘";
    case 2:
      return "漏带";

    case 3:
      return "漏点";

    case 4:
      return "遗漏";

    case 5:
      return "疫情";

    case 6:
      return "酒精";

    case 7:
      return "分离告警";

    case 8:
      return "离线告警";

    /* case 9:
        return "过时告警" */

    case 10:
      return "低电告警";

    case 11:
      return "血压";

    case 12:
      return "遗留";

    default:
      break;
  }
};

/*首页告警统计*/
export const useAlarmStatistics = () => {
  const client = useHttp();
  return useQuery(["alarmStatistics"], async () => {
    const data = await client(`report/webWarn`);
    data.data.forEach((key: any) => {
      key["name"] = Type(key["type"]);
      key['value'] = key['num']
    });
    return data;
  });
};

/*首页告警统计分页查询*/
export const useAlarmPagination = (params?: any) => {
  const p = params.type ? true : false;

  const client = useHttp();
  return useQuery(
    ["alarmPagination", cleanObject(params)],
    async () => {
      const data = await client(
        `report/webWarnMore?${qs.stringify(cleanObject(params))}`,
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
* 告警统计弹框
* */

export const useAlarmModal = () => {
    const { alarmId, setAlarmId } = useHomeContext()
  
    const open = (id: number) => setAlarmId(id)
  
    const close = () => setAlarmId(undefined)
  
    return {
      ModalOpen: Boolean(alarmId),
      open,
      close,
      alarmId,
    }
  }