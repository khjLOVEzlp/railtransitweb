import { useEffect, useRef } from "react"
import * as echarts from 'echarts';
import { useLine, useSubwayList } from 'views/system/child/line/request'
import { subwaylist, newArr, line } from './index'
import { useHttp } from "utils/http"
import { FullPageLoading } from "components/FullPageLoading";

export const Subway = () => {
  const { data: lineList, isSuccess, isLoading } = useLine()
  // const { data: subwayList, isSuccess:success } = useSubwayList()
  
  const client = useHttp()
  if (isSuccess) {
    // @ts-ignore
    let newData: any = newArr.filter((v) => lineList.data.find((vi: { [key: string]: unknown }) => vi.name === v.name))
    console.log(newData);
    
    newData.forEach((item: any, index: number) => {
      if (lineList.data.find(((v: any) => v.name === item.name))) {
        item.stations.forEach((key: any, i: number) => {
          if (lineList.data[index]["platformList"].find((vi: any) => vi.name === key["name"])) {
            key["subwayId"] = lineList.data[index]["platformList"].find((vi: any) => vi.name === key["name"]).id
          }
        })
      }
    })

    newData.forEach((item: any, index: number) => {
      item.tooltip.formatter = `{b}
      <br />人数：${lineList?.data[index].personCount || "0"}
      <br />班别数：${lineList?.data[index].classCount || "0"}
      <br />仓库数：${lineList?.data[index].warehouseCount || "0"}
      <br />站台数：${lineList?.data[index].platformCount || "0"}
      <br />`
      item.tooltip.alwaysShowContent = true
    })

    var newlist: any = []

    newData.forEach((v: { [key: string]: [] }) => {
      newlist = [
        ...newlist,
        { name: v.name, tooltip: v.tooltip, symbolSize: v.symbolSize, value: v.value, fixed: v.fixed, category: v.category, label: v.label, itemStyle: v.itemStyle },
        ...v.stations
      ]
    })

    var obj: any = {}

    var str = newlist.reduce((cur: any, next: any) => {
      if (obj[next.name]) {
        cur.map((item: any) => {
          if (item.name === next.name) {
            return item.isFlag = true
          }
        })
      } else {
        obj[next.name] = true && cur.push(next)
      }
      return cur;
    }, [])
  }

  const option = {
    title: {
      text: "上海地铁线路图",
      // text: "广州地铁线路图",
      textStyle: {
        color: "#000",
        fontSize: 20,
      },
      x: "center",
      top: 10,
    },
    //不设置背景颜色就是透明色
    backgroundColor: "white",
    xAxis: {
      show: false,
      min: 0,
      max: 2500,
      // type: "value",
      //开启x轴坐标
      axisPointer: {
        show: false,
      },
    },
    yAxis: {
      show: false,
      min: -2500,
      max: 0,
      //   type: "value",
      //开启y轴坐标
      axisPointer: {
        show: false,
      },
    },
    tooltip: {},
    grid: {
      x: 50,
      y: 50,
      x2: 50,
      y2: 50,
    },
    //  legend: {
    //     show: false
    //  },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 20,
        end: 100,
        textStyle: {
          fontSize: 20
        }
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 20,
        end: 100,
        textStyle: {
          fontSize: 16
        }
      },
    ],
    series: [
      {
        type: "graph",
        zlevel: 5,
        draggable: false,
        coordinateSystem: "cartesian2d",
        symbol: "rect",
        symbolOffset: [0, 0],

        label: {
          normal: {
            show: true,
          },
        },
        data: str,
        links: line,
        // links: subwayList?.data[1],
        /* 
        [
          {
            source: "西塱",
            target: "坑口",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "坑口",
            target: "花地湾",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "花地湾",
            target: "芳村",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "芳村",
            target: "黄沙",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "黄沙",
            target: "长寿路",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "长寿路",
            target: "陈家祠",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "陈家祠",
            target: "西门口",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "西门口",
            target: "公园前",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "公园前",
            target: "农讲所",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "农讲所",
            target: "烈士陵园",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "烈士陵园",
            target: "东山口",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "东山口",
            target: "杨箕",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "杨箕",
            target: "体育西路",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "体育西路",
            target: "体育中心",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "体育中心",
            target: "广州东站",
            lineStyle: {
              normal: {
                color: "#F9E103",
              },
            },
          },
          {
            source: "嘉禾望岗",
            target: "黄边",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "黄边",
            target: "江夏",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "江夏",
            target: "萧岗",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "萧岗",
            target: "白云文化广场",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "白云文化广场",
            target: "白云公园",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "白云公园",
            target: "飞翔公园",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "飞翔公园",
            target: "三元里",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "三元里",
            target: "广州火车站",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "广州火车站",
            target: "越秀公园",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "越秀公园",
            target: "纪念堂",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "纪念堂",
            target: "公园前",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "公园前",
            target: "海珠广场",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "海珠广场",
            target: "市二宫",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "市二宫",
            target: "江南西",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "江南西",
            target: "昌岗",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "昌岗",
            target: "江泰路",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "江泰路",
            target: "东晓南",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "东晓南",
            target: "南洲",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "南洲",
            target: "洛溪",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "洛溪",
            target: "南浦",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "南浦",
            target: "会江",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "会江",
            target: "石壁",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "石壁",
            target: "广州南站",
            lineStyle: {
              normal: {
                color: "#4f90cb",
              },
            },
          },
          {
            source: "天河客运站",
            target: "五山",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "五山",
            target: "华师",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "华师",
            target: "岗顶",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "岗顶",
            target: "石牌桥",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "石牌桥",
            target: "体育西路",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "体育西路",
            target: "珠江新城",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "珠江新城",
            target: "广州塔",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "广州塔",
            target: "客村",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "客村",
            target: "大塘",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "大塘",
            target: "沥滘",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "沥滘",
            target: "厦滘",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "厦滘",
            target: "大石",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "大石",
            target: "汉溪长隆",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "汉溪长隆",
            target: "市桥",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "市桥",
            target: "番禺广场",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "体育西路",
            target: "林和西",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "林和西",
            target: "广州东站",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "广州东站",
            target: "燕塘",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "燕塘",
            target: "梅花园",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "梅花园",
            target: "京溪南方医院",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "京溪南方医院",
            target: "同和",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "同和",
            target: "永泰",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "永泰",
            target: "白云大道北",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "白云大道北",
            target: "嘉禾望岗",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "嘉禾望岗",
            target: "龙归",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "龙归",
            target: "人和",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "人和",
            target: "高增",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "高增",
            target: "机场南(1号航站楼)",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "机场南(1号航站楼)",
            target: "机场北(2号航站楼)",
            lineStyle: {
              normal: {
                color: "#EA6632",
              },
            },
          },
          {
            source: "黄村",
            target: "车陂",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "车陂",
            target: "车陂南",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "车陂南",
            target: "万胜围",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "万胜围",
            target: "官洲",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "官洲",
            target: "大学城北",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "大学城北",
            target: "大学城南",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "大学城南",
            target: "新造",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "新造",
            target: "石碁",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "石碁",
            target: "海傍",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "海傍",
            target: "低涌",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "低涌",
            target: "东涌",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "东涌",
            target: "庆盛",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "庆盛",
            target: "黄阁汽车城",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "黄阁汽车城",
            target: "黄阁",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "黄阁",
            target: "蕉门",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "蕉门",
            target: "金洲",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "金洲",
            target: "飞沙角",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "飞沙角",
            target: "广隆",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "广隆",
            target: "大涌",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "大涌",
            target: "塘坑",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "塘坑",
            target: "南横",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "南横",
            target: "南沙客运港",
            lineStyle: {
              normal: {
                color: "#009900",
              },
            },
          },
          {
            source: "滘口",
            target: "坦尾",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "坦尾",
            target: "中山八",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "中山八",
            target: "西场",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "西场",
            target: "西村",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "西村",
            target: "广州火车站",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "广州火车站",
            target: "小北",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "小北",
            target: "淘金",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "淘金",
            target: "区庄",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "区庄",
            target: "动物园",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "动物园",
            target: "杨箕",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "杨箕",
            target: "五羊邨",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "五羊邨",
            target: "珠江新城",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "珠江新城",
            target: "猎德",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "猎德",
            target: "潭村",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "潭村",
            target: "员村",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "员村",
            target: "科韵路",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "科韵路",
            target: "车陂南",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "车陂南",
            target: "东圃",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "东圃",
            target: "三溪",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "三溪",
            target: "鱼珠",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "鱼珠",
            target: "大沙地",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "大沙地",
            target: "大沙东",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "大沙东",
            target: "文冲",
            lineStyle: {
              normal: {
                color: "#FF0000",
              },
            },
          },
          {
            source: "香雪",
            target: "萝岗",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "萝岗",
            target: "苏元",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "苏元",
            target: "暹岗",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "暹岗",
            target: "金峰",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "金峰",
            target: "黄陂",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "黄陂",
            target: "高塘石",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "高塘石",
            target: "柯木塱",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "柯木塱",
            target: "龙洞",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "龙洞",
            target: "植物园",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "植物园",
            target: "长湴",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "长湴",
            target: "天河客运站",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "天河客运站",
            target: "燕塘",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "燕塘",
            target: "天平架",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "天平架",
            target: "沙河顶",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "沙河顶",
            target: "黄花岗",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "黄花岗",
            target: "区庄",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "区庄",
            target: "东山口",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "东山口",
            target: "东湖",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "东湖",
            target: "团一大广场",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "团一大广场",
            target: "北京路",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "北京路",
            target: "海珠广场",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "海珠广场",
            target: "一德路",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "一德路",
            target: "文化公园",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "文化公园",
            target: "黄沙",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "黄沙",
            target: "如意坊",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "如意坊",
            target: "坦尾",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "坦尾",
            target: "河沙",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "河沙",
            target: "沙贝",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "沙贝",
            target: "横沙",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "横沙",
            target: "浔峰岗",
            lineStyle: {
              normal: {
                color: "#8B1F5C",
              },
            },
          },
          {
            source: "广州南站",
            target: "石壁",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "石壁",
            target: "谢村",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "谢村",
            target: "钟村",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "钟村",
            target: "汉溪长隆",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "汉溪长隆",
            target: "南村万博",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "南村万博",
            target: "员岗",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "员岗",
            target: "板桥",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "板桥",
            target: "大学城南",
            lineStyle: {
              normal: {
                color: "#3FA37E",
              },
            },
          },
          {
            source: "滘心",
            target: "亭岗",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "亭岗",
            target: "石井",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "石井",
            target: "小坪",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "小坪",
            target: "石潭",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "石潭",
            target: "聚龙",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "聚龙",
            target: "上步",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "上步",
            target: "同德",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "同德",
            target: "鹅掌坦",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "鹅掌坦",
            target: "西村",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "西村",
            target: "陈家祠",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "陈家祠",
            target: "华林寺",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "华林寺",
            target: "文化公园",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "文化公园",
            target: "同福西",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "同福西",
            target: "凤凰新村",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "凤凰新村",
            target: "沙园",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "沙园",
            target: "宝岗大道",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "宝岗大道",
            target: "昌岗",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "昌岗",
            target: "晓港",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "晓港",
            target: "中大",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "中大",
            target: "鹭江",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "鹭江",
            target: "客村",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "客村",
            target: "赤岗",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "赤岗",
            target: "磨碟沙",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "磨碟沙",
            target: "新港东",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "新港东",
            target: "琶洲",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "琶洲",
            target: "万胜围",
            lineStyle: {
              normal: {
                color: "#00A1CC",
              },
            },
          },
          {
            source: "高增",
            target: "清塘",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "清塘",
            target: "清布",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "清布",
            target: "莲塘",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "莲塘",
            target: "马鞍山公园",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "马鞍山公园",
            target: "花都广场",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "花都广场",
            target: "花果山公园",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "花果山公园",
            target: "花城路",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "花城路",
            target: "广州北站",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "广州北站",
            target: "花都汽车城",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "花都汽车城",
            target: "飞鹅岭",
            lineStyle: {
              normal: {
                color: "#99c857",
              },
            },
          },
          {
            source: "鱼珠",
            target: "裕丰围",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "裕丰围",
            target: "双岗",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "双岗",
            target: "南海神庙",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "南海神庙",
            target: "夏园",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "夏园",
            target: "南岗",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "南岗",
            target: "沙村",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "沙村",
            target: "白江",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "白江",
            target: "新塘",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "新塘",
            target: "官湖",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "官湖",
            target: "新沙",
            lineStyle: {
              normal: {
                color: "#a7b942",
              },
            },
          },
          {
            source: "嘉禾望岗",
            target: "白云东平",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "白云东平",
            target: "夏良",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "夏良",
            target: "太和",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "太和",
            target: "竹料",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "竹料",
            target: "钟落潭",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "钟落潭",
            target: "马沥",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "马沥",
            target: "新和",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "新和",
            target: "太平",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "太平",
            target: "神岗",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "神岗",
            target: "赤草",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "赤草",
            target: "从化客运站",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "从化客运站",
            target: "东风",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "员村",
            target: "天河公园",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "天河公园",
            target: "棠东",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "棠东",
            target: "黄村",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "黄村",
            target: "大观南路",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "大观南路",
            target: "天河智慧城",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "天河智慧城",
            target: "神舟路",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "神舟路",
            target: "科学城",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "科学城",
            target: "苏元",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "苏元",
            target: "水西",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "水西",
            target: "长平",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "长平",
            target: "金坑",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "金坑",
            target: "镇龙西",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "镇龙西",
            target: "镇龙",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "镇龙",
            target: "中新",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "中新",
            target: "坑贝",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "坑贝",
            target: "凤岗",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "凤岗",
            target: "朱村",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "朱村",
            target: "山田",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "山田",
            target: "钟岗",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "钟岗",
            target: "增城广场",
            lineStyle: {
              normal: {
                color: "#203082",
              },
            },
          },
          {
            source: "沥滘",
            target: "南洲",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "南洲",
            target: "石溪",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "石溪",
            target: "燕岗",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "燕岗",
            target: "沙园",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "沙园",
            target: "沙涌",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "沙涌",
            target: "鹤洞",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "鹤洞",
            target: "西塱",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "西塱",
            target: "菊树",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "菊树",
            target: "龙溪",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "龙溪",
            target: "金融高新区",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "金融高新区",
            target: "千灯湖",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "千灯湖",
            target: "礌岗",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "礌岗",
            target: "南桂路",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "南桂路",
            target: "桂城",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "桂城",
            target: "朝安",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "朝安",
            target: "普君北路",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "普君北路",
            target: "祖庙",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "祖庙",
            target: "同济路",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "同济路",
            target: "季华园",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "季华园",
            target: "魁奇路",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "魁奇路",
            target: "澜石",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "澜石",
            target: "世纪莲",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "世纪莲",
            target: "东平",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "东平",
            target: "新城东",
            lineStyle: {
              normal: {
                color: "#c9e887",
              },
            },
          },
          {
            source: "林和西",
            target: "体育中心南",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "体育中心南",
            target: "天河南",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "天河南",
            target: "黄埔大道",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "黄埔大道",
            target: "妇儿中心",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "妇儿中心",
            target: "花城大道",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "花城大道",
            target: "大剧院",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "大剧院",
            target: "海心沙",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "海心沙",
            target: "广州塔",
            lineStyle: {
              normal: {
                color: "#00a1cb",
              },
            },
          },
          {
            source: "新和",
            target: "红卫",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "红卫",
            target: "新南",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "新南",
            target: "枫下",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "枫下",
            target: "知识城",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "知识城",
            target: "何棠下",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "何棠下",
            target: "旺村",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "旺村",
            target: "汤村",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "汤村",
            target: "镇龙北",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
          {
            source: "镇龙北",
            target: "镇龙",
            lineStyle: {
              normal: {
                color: "#721920",
              },
            },
          },
        ]
        */
        lineStyle: {
          normal: {
            opacity: 0.6, //线条透明度
            color: "#53B5EA",
            curveness: 0, //站点间连线曲度，0表示直线
            width: 6, //线条宽度
          },
        },
      },
    ],
  };

  const refs = useRef(null);

  let myEcharts: any

  if (myEcharts != null && myEcharts != "" && myEcharts != undefined) {
    // @ts-ignore
    myEcharts.dispose();
  }

  useEffect(() => {
    myEcharts = echarts.init(document.getElementById('subway') as HTMLElement)
    myEcharts.setOption(option)

    myEcharts.on("mouseover", (params: any) => {
      if (params.data.subwayId) {
        client(`linePlatform/getInfo/${params.data.subwayId}`).then(async (res) => {
          const data = await res.data
          params.data.tooltip.formatter = `{b}<br />班别：${data[0]?.departmentName || "无"}<br />区间：${data[0]?.roadName || "无"}<br />材料数量：${data[0]?.count || "0"}`
        })
      } else if (params.data.tooltip) {
        params.data.tooltip.formatter = `{b}<br />班别：无<br />区间：无<br />材料数量：0`
      } else {
        return false
      }
    })

    window.addEventListener('resize', () => {
      if (myEcharts != null) {
        myEcharts.resize()
      }
    })
    // @ts-ignore
    if (refs.current?.offsetWidth) {
      myEcharts.resize()
    }
    // @ts-ignore
  }, [refs.current?.offsetWidth, option])

  return (
    <>
      {
        isLoading && <FullPageLoading />
      }

      <div id="subway" style={{ height: "100%", width: "100%" }} ref={refs} />

      {/* <Modal
        width={300}
        footer={false}
        visible={visible}
        onCancel={onClose}
      >
        {
          isLoading ? (
            <Spin />
          ) : (
            <div>
              {
                lineStatistics?.data.map((item: any) => (
                  <div>
                    <p>班别：{item.departmentName}</p>
                    <p>区间：{item.roadName}</p>
                    <p>材料数量：{item.count}</p>
                  </div>
                ))
              }
            </div>
          )
        }
      </Modal> */}
    </>
  )
}
