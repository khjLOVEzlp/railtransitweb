/* 数据列表搜索参数 */

import { useState } from "react"

type Param = { index: number, size: number, name: string }

export const useParam = () => {
  const [param, setParam] = useState<Param>({
    index: 1,
    size: 10,
    name: ""
  })

  return {
    param,
    setParam
  }
}