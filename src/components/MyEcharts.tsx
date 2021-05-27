import * as echarts from 'echarts';
import {useEffect} from "react";
import {useNavigate} from "react-router";

interface Props {
  data: any
  style: any
  id: any
}

export const MyEcharts = ({data, style, id}: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const myEcharts = echarts.init(document.getElementById(id) as HTMLElement)
    myEcharts.setOption(data)
    if (id === "alert") {
      myEcharts.on('click', (params:any) => {
        navigate(`/alarm`,{replace: true, state: params.name})
      })
    }
  }, [data, id, navigate])

  return (
    <div id={id} style={style}/>
  )
}
