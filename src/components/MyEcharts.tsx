import * as echarts from 'echarts';
import {useEffect} from "react";

interface Props {
  data: any
  style: any
  id: any
}

export const MyEcharts = ({data, style, id}: Props) => {
  useEffect(() => {
    const myEcharts = echarts.init(document.getElementById(id) as HTMLElement)
    myEcharts.setOption(data)
  }, [data, id])

  return (
    <div id={id} style={style}/>
  )
}
