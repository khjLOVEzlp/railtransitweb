import { useEffect } from "react"
import * as echarts from 'echarts';
import { useLine } from 'views/system/child/line/request'

export const Subway = () => {
  const { data: lineList, isLoading, isSuccess } = useLine()
  const data = [
    {
      name: "地铁1号线",
      tooltip: {
        formatter: "{b}:地铁1号线<br />",
      },
      symbolSize: 0.1,
      value: [502, -1204],
      fixed: true,
      category: 1,
      label: {
        color: "#F9E103",
        position: "bottom",
        fontSize: 12,
        fontWeight: 700,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#F9E103",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "西塱",
      value: [562, -1470],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "坑口",
      value: [562, -1398],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花地湾",
      value: [562, -1326],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "芳村",
      value: [562, -1254],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄沙",
      value: [494, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "长寿路",
      value: [494, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "陈家祠",
      value: [600, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "西门口",
      value: [668, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "公园前",
      value: [734, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "农讲所",
      value: [819, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "烈士陵园",
      value: [882, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东山口",
      value: [948, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "杨箕",
      value: [995, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "体育西路",
      value: [1077, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "体育中心",
      value: [1206, -984],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
    },
    {
      name: "广州东站",
      value: [1077, -938],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#F9E103",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "地铁2号线",
      tooltip: {
        formatter: "{b}:地铁2号线<br />",
      },
      symbolSize: 0.1,
      value: [844, -835],
      fixed: true,
      category: 1,
      label: {
        color: "#4f90cb",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#4f90cb",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "嘉禾望岗",
      value: [898, -750],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-45", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "黄边",
      value: [866, -783],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "江夏",
      value: [840, -809],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "萧岗",
      value: [814, -835],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "白云文化广场",
      value: [788, -861],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-65", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "白云公园",
      value: [762, -887],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-45", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "飞翔公园",
      value: [734, -913],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-45", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "三元里",
      value: [734, -947],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "广州火车站",
      value: [734, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-50", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "越秀公园",
      value: [734, -1020],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "纪念堂",
      value: [734, -1059],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "海珠广场",
      value: [734, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "市二宫",
      value: [734, -1205],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "江南西",
      value: [734, -1267],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "昌岗",
      value: [734, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "江泰路",
      value: [734, -1395],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东晓南",
      value: [734, -1460],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南洲",
      value: [734, -1525],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "洛溪",
      value: [734, -1590],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南浦",
      value: [734, -1655],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "会江",
      value: [734, -1720],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "石壁",
      value: [734, -1785],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "广州南站",
      value: [734, -1863],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#4f90cb",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "地铁3号线",
      tooltip: {
        formatter: "{b}:地铁3号线<br />",
      },
      symbolSize: 0.1,
      value: [1276, -1018],
      fixed: true,
      category: 1,
      label: {
        color: "#EA6632",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#EA6632",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "天河客运站",
      value: [1378, -893],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "五山",
      value: [1380, -994],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "华师",
      value: [1332, -1036],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["15", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "岗顶",
      value: [1276, -1078],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["15", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "石牌桥",
      value: [1213, -1117],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["15", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "珠江新城",
      value: [1077, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "广州塔",
      value: [1077, -1268],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "客村",
      value: [1077, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "大塘",
      value: [1077, -1410],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沥滘",
      value: [1077, -1474],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "厦滘",
      value: [1077, -1525],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大石",
      value: [1077, -1579],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "汉溪长隆",
      value: [1077, -1631],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "市桥",
      value: [1126, -1661],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "番禺广场",
      value: [1198, -1661],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁3号线北延段",
      tooltip: {
        formatter: "{b}:地铁3号线北延段<br />",
      },
      symbolSize: 0.1,
      value: [1000, -803],
      fixed: true,
      category: 1,
      label: {
        color: "#EA6632",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#EA6632",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "林和西",
      value: [1077, -1001],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "燕塘",
      value: [1077, -893],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "梅花园",
      value: [1050, -870],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "京溪南方医院",
      value: [1020, -846],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "同和",
      value: [990, -823],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "永泰",
      value: [960, -800],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "白云大道北",
      value: [931, -776],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "龙归",
      value: [898, -698],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "人和",
      value: [898, -653],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "高增",
      value: [898, -615],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "机场南(1号航站楼)",
      value: [898, -563],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "机场北(2号航站楼)",
      value: [898, -498],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#EA6632",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁4号线",
      tooltip: {
        formatter: "{b}:地铁4号线<br />",
      },
      symbolSize: 0.1,
      value: [1888, -1965],
      fixed: true,
      category: 1,
      label: {
        color: "#009900",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#009900",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "黄村",
      value: [1438, -1115],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "车陂",
      value: [1399, -1161],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["15", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "车陂南",
      value: [1358, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "万胜围",
      value: [1358, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "官洲",
      value: [1358, -1392],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大学城北",
      value: [1358, -1452],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大学城南",
      value: [1358, -1511],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "新造",
      value: [1358, -1570],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "石碁",
      value: [1358, -1630],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "海傍",
      value: [1358, -1689],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "低涌",
      value: [1358, -1748],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东涌",
      value: [1358, -1807],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "庆盛",
      value: [1400, -1832],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄阁汽车城",
      value: [1450, -1862],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄阁",
      value: [1533, -1862],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "蕉门",
      value: [1601, -1862],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "金洲",
      value: [1671, -1862],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "飞沙角",
      value: [1671, -1941],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "广隆",
      value: [1671, -2034],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大涌",
      value: [1755, -2076],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "塘坑",
      value: [1900, -2076],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南横",
      value: [2047, -1961],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南沙客运港",
      value: [2047, -1862],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#009900",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁5号线",
      tooltip: {
        formatter: "{b}:地铁5号线<br />",
      },
      symbolSize: 0.1,
      value: [362, -1138],
      fixed: true,
      category: 1,
      label: {
        color: "#FF0000",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#FF0000",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "滘口",
      value: [352, -1118],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "坦尾",
      value: [403, -1059],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["15", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "中山八",
      value: [561, -1059],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "西场",
      value: [600, -1020],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-15", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "西村",
      value: [638, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "小北",
      value: [820, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "淘金",
      value: [904, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "区庄",
      value: [948, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "动物园",
      value: [995, -1035],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "五羊邨",
      value: [995, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "猎德",
      value: [1133, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "潭村",
      value: [1190, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "员村",
      value: [1246, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "科韵路",
      value: [1302, -1208],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东圃",
      value: [1391, -1237],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "三溪",
      value: [1427, -1269],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "鱼珠",
      value: [1467, -1309],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "大沙地",
      value: [1548, -1309],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大沙东",
      value: [1624, -1309],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "文冲",
      value: [1704, -1309],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#FF0000",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁6号线",
      tooltip: {
        formatter: "{b}:地铁6号线<br />",
      },
      symbolSize: 0.1,
      value: [2003, -804],
      fixed: true,
      category: 1,
      label: {
        color: "#8B1F5C",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#8B1F5C",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "香雪",
      value: [2023, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "萝岗",
      value: [1961, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "苏元",
      value: [1903, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "暹岗",
      value: [1826, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "金峰",
      value: [1766, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄陂",
      value: [1687, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "高塘石",
      value: [1614, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "柯木塱",
      value: [1552, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "龙洞",
      value: [1487, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "植物园",
      value: [1405, -784],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "长湴",
      value: [1378, -836],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "天平架",
      value: [1038, -893],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沙河顶",
      value: [1008, -918],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄花岗",
      value: [1008, -942],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东湖",
      value: [948, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "团一大广场",
      value: [879, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "北京路",
      value: [808, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "一德路",
      value: [667, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "文化公园",
      value: [573, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "如意坊",
      value: [443, -1102],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "河沙",
      value: [403, -982],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沙贝",
      value: [403, -920],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "横沙",
      value: [403, -857],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "浔峰岗",
      value: [403, -795],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#8B1F5C",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁7号线",
      tooltip: {
        formatter: "{b}:地铁7号线<br />",
      },
      symbolSize: 0.1,
      value: [802, -1813],
      fixed: true,
      category: 1,
      label: {
        color: "#3FA37E",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#3FA37E",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "谢村",
      value: [832, -1746],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#3FA37E",
          borderWidth: 2,
        },
      },
    },
    {
      name: "钟村",
      value: [967, -1682],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#3FA37E",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南村万博",
      value: [1135, -1606],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#3FA37E",
          borderWidth: 2,
        },
      },
    },
    {
      name: "员岗",
      value: [1223, -1568],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#3FA37E",
          borderWidth: 2,
        },
      },
    },
    {
      name: "板桥",
      value: [1300, -1537],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#3FA37E",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁8号线",
      tooltip: {
        formatter: "{b}:地铁8号线<br />",
      },
      symbolSize: 0.1,
      value: [583, -568],
      fixed: true,
      category: 1,
      label: {
        color: "#00A1CC",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#00A1CC",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "滘心",
      value: [533, -618],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "亭岗",
      value: [533, -670],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "石井",
      value: [585, -709],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "小坪",
      value: [638, -748],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "石潭",
      value: [638, -787],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "聚龙",
      value: [638, -826],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "上步",
      value: [638, -865],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "同德",
      value: [638, -904],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "鹅掌坦",
      value: [638, -943],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "华林寺",
      value: [586, -1142],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "同福西",
      value: [604, -1216],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "凤凰新村",
      value: [586, -1265],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沙园",
      value: [638, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "宝岗大道",
      value: [690, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "晓港",
      value: [796, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "中大",
      value: [875, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "鹭江",
      value: [953, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "赤岗",
      value: [1167, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "磨碟沙",
      value: [1217, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新港东",
      value: [1267, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "琶洲",
      value: [1316, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00A1CC",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁9号线",
      tooltip: {
        formatter: "{b}:地铁9号线<br />",
      },
      symbolSize: 0.1,
      value: [140, -565],
      fixed: true,
      category: 1,
      label: {
        color: "#99c857",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#99c857",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "清塘",
      value: [833, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "清布",
      value: [768, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "莲塘",
      value: [703, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "马鞍山公园",
      value: [651, -485],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花都广场",
      value: [547, -485],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花果山公园",
      value: [526, -516],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-50", "-10"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花城路",
      value: [401, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "广州北站",
      value: [297, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花都汽车城",
      value: [193, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "飞鹅岭",
      value: [89, -550],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#99c857",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁13号线",
      tooltip: {
        formatter: "{b}:地铁13号线<br />",
      },
      symbolSize: 0.1,
      value: [2107, -1459],
      fixed: true,
      category: 1,
      label: {
        color: "#a7b942",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#a7b942",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "裕丰围",
      value: [1467, -1355],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "双岗",
      value: [1520, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["10", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南海神庙",
      value: [1594, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "夏园",
      value: [1672, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南岗",
      value: [1751, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沙村",
      value: [1826, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "白江",
      value: [1896, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新塘",
      value: [1965, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "官湖",
      value: [2042, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新沙",
      value: [2129, -1413],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#a7b942",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁14号线",
      tooltip: {
        formatter: "{b}:地铁14号线<br />",
      },
      symbolSize: 0.1,
      value: [1458, -100],
      fixed: true,
      category: 1,
      label: {
        color: "#721920",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#721920",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "白云东平",
      value: [950, -698],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-40", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "夏良",
      value: [1002, -646],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "太和",
      value: [1054, -594],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "竹料",
      value: [1106, -542],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "钟落潭",
      value: [1158, -490],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-30", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "马沥",
      value: [1210, -438],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新和",
      value: [1275, -373],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "太平",
      value: [1327, -321],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "神岗",
      value: [1379, -269],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "赤草",
      value: [1431, -217],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-20", "-5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "从化客运站",
      value: [1483, -165],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东风",
      value: [1535, -113],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["20", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁21号线",
      tooltip: {
        formatter: "{b}:地铁21号线<br />",
      },
      symbolSize: 0.1,
      value: [2196, -358],
      fixed: true,
      category: 1,
      label: {
        color: "#203082",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#203082",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "天河公园",
      value: [1289, -1161],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "棠东",
      value: [1380, -1115],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大观南路",
      value: [1438, -1076],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "天河智慧城",
      value: [1554, -990],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "神舟路",
      value: [1670, -931],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "科学城",
      value: [1787, -871],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "水西",
      value: [1903, -732],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "长平",
      value: [1903, -687],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "金坑",
      value: [1903, -635],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "镇龙西",
      value: [1903, -583],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "镇龙",
      value: [1903, -544],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
      isFlag: true,
    },
    {
      name: "中新",
      value: [1903, -492],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "坑贝",
      value: [1903, -427],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["0", "-15"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "凤岗",
      value: [1968, -394],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "朱村",
      value: [2033, -362],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "山田",
      value: [2098, -329],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "钟岗",
      value: [2163, -298],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "增城广场",
      value: [2228, -266],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#203082",
          borderWidth: 2,
        },
      },
    },
    {
      name: "广佛线",
      tooltip: {
        formatter: "{b}:广佛线<br />",
      },
      symbolSize: 0.1,
      value: [447, -1934],
      fixed: true,
      category: 1,
      label: {
        color: "#c9e887",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#c9e887",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "石溪",
      value: [712, -1492],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "燕岗",
      value: [712, -1427],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: ["-25", "5"],
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "沙涌",
      value: [602, -1332],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "鹤洞",
      value: [602, -1401],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "菊树",
      value: [523, -1470],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "龙溪",
      value: [484, -1470],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "金融高新区",
      value: [445, -1470],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "千灯湖",
      value: [445, -1538],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "礌岗",
      value: [445, -1603],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "南桂路",
      value: [445, -1668],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "桂城",
      value: [406, -1668],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "朝安",
      value: [367, -1668],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "普君北路",
      value: [315, -1668],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "祖庙",
      value: [263, -1668],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "同济路",
      value: [263, -1733],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "季华园",
      value: [263, -1785],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "魁奇路",
      value: [263, -1850],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "澜石",
      value: [263, -1915],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "left",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "世纪莲",
      value: [287, -1967],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "东平",
      value: [339, -1967],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新城东",
      value: [391, -1967],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "bottom",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#c9e887",
          borderWidth: 2,
        },
      },
    },
    {
      name: "apm线",
      tooltip: {
        formatter: "{b}:apm线<br />",
      },
      symbolSize: 0.1,
      value: [1127, -951],
      fixed: true,
      category: 1,
      label: {
        color: "#00a1cb",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#00a1cb",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "体育中心南",
      value: [1100, -1026],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "天河南",
      value: [1100, -1055],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "黄埔大道",
      value: [1100, -1082],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "妇儿中心",
      value: [1100, -1106],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "花城大道",
      value: [1100, -1139],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "大剧院",
      value: [1100, -1166],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "海心沙",
      value: [1100, -1193],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "right",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#00a1cb",
          borderWidth: 2,
        },
      },
    },
    {
      name: "地铁14号线支线",
      tooltip: {
        formatter: "{b}:地铁14号线支线<br />",
      },
      symbolSize: 0.1,
      value: [1625, -523],
      fixed: true,
      category: 1,
      label: {
        color: "#721920",
        position: "bottom",
        fontSize: 12,
        fontWeight: 1000,
      },
      itemStyle: {
        normal: {
          normal: {
            color: "#fff",
            borderColor: "#721920",
            borderWidth: 3,
          },
        },
      },
    },
    {
      name: "红卫",
      value: [1370, -334],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "新南",
      value: [1436, -352],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "枫下",
      value: [1502, -383],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "知识城",
      value: [1564, -411],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "何棠下",
      value: [1631, -443],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "旺村",
      value: [1698, -475],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "汤村",
      value: [1767, -508],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
    {
      name: "镇龙北",
      value: [1838, -541],
      fixed: true,
      symbol: "circle",
      symbolSize: [10, 10],
      label: {
        color: "#000",
        position: "top",
        fontSize: 10,
      },
      category: 1,
      itemStyle: {
        normal: {
          color: "#fff",
          borderColor: "#721920",
          borderWidth: 2,
        },
      },
    },
  ];

  const option = {
    title: {
      text: "广州地铁线路图",
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
    //  legend: {
    //     show: false
    //  },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 20,
        end: 100,
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 20,
        end: 100,
      },
    ],
    series: [
      {
        type: "graph",
        zlevel: 5,
        draggable: false,
        coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

        // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
        // edgeLabel: {
        //   normal: {
        //     textStyle: {
        //       fontSize: 60
        //     }
        //   }
        // },
        symbol: "rect",
        symbolOffset: [0, 0],

        label: {
          normal: {
            show: true,
          },
        },
        data: data,
        links: [
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
        ],
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

  useEffect(() => {
    // @ts-ignore
    echarts.init(document.getElementById('subway') as HTMLElement).setOption(option)
  }, [])

  return (
    <div id="subway" style={{ height: "100%" }} />
  )
}