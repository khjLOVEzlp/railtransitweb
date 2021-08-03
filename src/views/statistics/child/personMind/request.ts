import qs from 'qs'
import { useQuery } from 'react-query'
import { useHttp } from 'utils/http'
import { cleanObject } from "utils/index";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMemo } from "react";
import { Search } from 'utils/typings';
import { PersonMind } from './typings';

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
export const useMindStatistics = (params?: Partial<Search>) => {
  const client = useHttp()
  return useQuery<PersonMind>(['MindStatistics', cleanObject(params)], async () => {
    const data = await client(`report/getPersonMind?${qs.stringify(cleanObject(params))}`, { method: "POST" })
    data.data.forEach((key: any) => {
      if (key["isAlcNormal"]) key["isAlcNormal"] = key["isAlcNormal"].replace("%", "")
      if (key["isBloodNormal"]) key["isBloodNormal"] = key["isBloodNormal"].replace("%", "")
      if (key["isTemNormal"]) key["isTemNormal"] = key["isTemNormal"].replace("%", "")
    })
    return data
  }, {
    enabled: Boolean(params?.subwayId) && Boolean(params?.time)
  }
  )
}

/*精神分析统计详情*/
export const useMindStatisticsDetail = (params?: any) => {
  const client = useHttp()
  return useQuery(['MindStatisticsDetail', cleanObject(params)], () =>
    client(`report/getPersonMindMore?${qs.stringify(cleanObject(params))}`, { method: "POST" }), {
    enabled: Boolean(params?.subwayId) && Boolean(params?.time)
  }
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
