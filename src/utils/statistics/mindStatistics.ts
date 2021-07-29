import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from '../http'
import { cleanObject } from "../index";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMemo } from "react";

/*项目列表搜索的参数*/
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["subwayId", "time"]);
  return [
    useMemo(
      () => ({ ...param }),
      [param]
    ),
    setParam,
  ] as const;
};

/*精神分析统计*/
export const useMindStatistics = (params?: any) => {
  const client = useHttp()
  return useQuery(['MindStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getPersonMind?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: any) => {
      if (key["isAlcNormal"]) key["isAlcNormal"] = parseInt(key["isAlcNormal"].replace("%", "")) * 0.01
      if (key["isBloodNormal"]) key["isBloodNormal"] = parseInt(key["isBloodNormal"].replace("%", "")) * 0.01
      if (key["isTemNormal"]) key["isTemNormal"] = parseInt(key["isTemNormal"].replace("%", "")) * 0.01
    })

    console.log(data);

    return data
  }
  )
}

/*精神分析统计详情*/
export const useMindStatisticsDetail = (params?: any) => {
  const client = useHttp()
  return useQuery(['MindStatisticsDetail', cleanObject(params)], () =>
    client(`report/getPersonMindMore?${qs.stringify(cleanObject(params))}`, { method: "POST" })
  )
}

/*到岗统计弹框*/

export const useMindModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{ openMind }, setOpenMind] = useUrlQueryParam([
    'openMind'
  ])

  const open = () => setOpenMind({ openMind: true })

  const close = () => setUrlParams({ openMind: "" })

  return {
    ModalOpen: openMind === 'true',
    open,
    close
  }
}
