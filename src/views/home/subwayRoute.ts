import * as echarts from 'echarts';

var data = [
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

export const option = {
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

// var stations = [
//   {
//     name: '韦家碾',
//     x: 109.55,
//     y: -769.35,
//     itemStyle: { borderColor: '#EE1822', color: 'white' },
//     label: { rotate: 120 },
//     category: '1号线',
//   },
//   { name: '升仙湖', x: 109.55, y: -669.35, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '火车北站', x: -28.95, y: -522.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '人民北路', x: -28.95, y: -411.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '文殊院', x: -96.55, y: -314.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '骡马市', x: -170.8, y: -240.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '天府广场', x: -170.8, y: -170.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '锦江宾馆', x: -170.8, y: -78.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '华西坝', x: -170.8, y: -5.95, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '省体育馆', x: -170.8, y: 69, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '倪家桥', x: -170.8, y: 120.15, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '桐梓林', x: -170.8, y: 181.7, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '火车南站', x: -170.8, y: 238.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '高新', x: -229.85, y: 380, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '金融城', x: -229.85, y: 453, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '孵化园', x: -229.85, y: 515.25, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '锦城广场', x: -195.85, y: 585.25, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '世纪城', x: -161.85, y: 645.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '天府三街', x: -161.85, y: 720, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '天府五街', x: -161.85, y: 795, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '华府大道', x: -161.85, y: 870, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '四河', x: -161.85, y: 945, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '广都', x: -121.85, y: 978, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '五根松', x: -81.85, y: 1018, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '华阳', x: -161.85, y: 1018, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '海昌路', x: -161.85, y: 1068, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '广福', x: -161.85, y: 1118, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '红石公园', x: -161.85, y: 1168, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '麓湖', x: -161.85, y: 1218, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '武汉路', x: -161.85, y: 1268, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '天府公园', x: -161.85, y: 1318, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '西博城', x: -161.85, y: 1368, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '广州路', x: -161.85, y: 1418, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '兴隆湖', x: -161.85, y: 1468, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '科学城', x: -161.85, y: 1518, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
//   { name: '犀浦', x: -785.35, y: -965, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '天河路', x: -745.35, y: -915, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '百草路', x: -705.35, y: -865, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '金周路', x: -665.35, y: -815, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '金科北路', x: -620.35, y: -765, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '迎宾大道', x: -580.35, y: -715, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   {
//     name: '茶店子客运站',
//     x: -540.35,
//     y: -660,
//     itemStyle: { borderColor: '#85C73F', color: 'white' },
//     category: '2号线',
//   },
//   { name: '羊犀立交', x: -591.35, y: -516.3, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '一品天下', x: -529.6, y: -452.7, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '蜀汉路东', x: -453.8, y: -370, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '白果林', x: -398.2, y: -308.45, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   {
//     name: '中医大省医院',
//     x: -352.5,
//     y: -258.95,
//     itemStyle: { borderColor: '#85C73F', color: 'white' },
//     category: '2号线',
//   },
//   { name: '通惠门', x: -287.85, y: -207.25, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '人民公园', x: -224.5, y: -188.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '春熙路', x: -34, y: -140, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '东门大桥', x: 35.5, y: -124.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '牛王庙', x: 113.5, y: -104.1, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '牛市口', x: 196.15, y: -82.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '东大路', x: 227.7, y: -62.95, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '塔子山公园', x: 270.7, y: -44.65, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '成都东客站', x: 318.7, y: -44.2, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '成渝立交', x: 359.2, y: 5.8, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '惠王陵', x: 434.7, y: 97.8, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '洪河', x: 474.7, y: 147, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '成都行政学院', x: 519.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '大面铺', x: 582.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '连山坡', x: 648.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '界牌', x: 715.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '书房', x: 784.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '龙平路', x: 850.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '龙泉驿', x: 918.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
//   { name: '太平园', x: -528, y: 238.6, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '红牌楼', x: -430, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '高升桥', x: -345, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '衣冠庙', x: -239, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '磨子桥', x: -34, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '新南门', x: -34, y: -62, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '市二医院', x: 2, y: -193, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '红星桥', x: 66, y: -290, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '前锋路', x: 123, y: -377, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '李家沱', x: 124, y: -444, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '驷马桥', x: 195, y: -524, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '昭觉寺南路', x: 242, y: -575, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '动物园', x: 292, y: -632, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '熊猫大道', x: 340, y: -686, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '军区总医院', x: 389, y: -742, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
//   { name: '马厂坝', x: -894.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '凤凰大街', x: -975.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '涌泉', x: -1045.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '光华公园', x: -1106.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '南熏大道', x: -1170.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '凤溪河', x: -1236.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '杨柳河', x: -1299.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '万盛', x: -1368.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '非遗博览园', x: -820, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '蔡桥', x: -724, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '中坝', x: -664, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '成都西站', x: -604, y: -261, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '清江西路', x: -560, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '文化宫', x: -530, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '西南财大', x: -456.5, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '草堂北路', x: -394.5, y: -259, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '宽窄巷子', x: -258, y: -242, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '太升南路', x: -82, y: -216, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '玉双路', x: 124, y: -160, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '双桥路', x: 192, y: -141, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '万年场', x: 255, y: -131, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '槐树店', x: 319.2, y: -110.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '来龙', x: 480.2, y: -98.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '十陵', x: 552.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '成都大学', x: 621.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '明蜀王陵', x: 683.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '西河', x: 745.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
//   { name: '簇锦', x: -580.6, y: 333.9, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
//   { name: '华兴', x: -624.6, y: 408.9, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
//   { name: '金花', x: -731.1, y: 482.4, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
//   {
//     name: '双流机场1航站楼',
//     x: -839.6,
//     y: 562,
//     itemStyle: { borderColor: '#B8A8CF', color: 'white' },
//     category: '10号线',
//   },
//   {
//     name: '双流机场2航站楼',
//     x: -882.9,
//     y: 654.2,
//     itemStyle: { borderColor: '#B8A8CF', color: 'white' },
//     category: '10号线',
//   },
//   { name: '高朋大道', x: -445.8, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '神仙树', x: -353.5, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '三瓦窑', x: -52.3, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '琉璃场', x: 56.7, y: 184.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '四川师大', x: 176.3, y: 128.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '狮子山', x: 258.6, y: 88.4, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '大观', x: 318.4, y: 59.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '迎晖路', x: 319.3, y: -80.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '双店路', x: 319.6, y: -201.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '崔家店', x: 319.6, y: -288.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '理工大学', x: 318.6, y: -368.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '二仙桥', x: 318.6, y: -453.4, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '八里庄', x: 318.1, y: -522.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '府青路', x: 254.2, y: -522.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '北站西二路', x: -92.3, y: -523, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '九里堤', x: -173.6, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '西南交大', x: -258.5, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '花照壁', x: -335.1, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '茶店子', x: -409.6, y: -523.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   {
//     name: '金沙博物馆',
//     x: -529.8,
//     y: -349.9,
//     itemStyle: { borderColor: '#F26F1F', color: 'white' },
//     category: '7号线',
//   },
//   { name: '东坡路', x: -529.7, y: -150.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '龙爪堰', x: -529.7, y: -43.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
//   { name: '武侯大道', x: -529.7, y: 75.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
// ];

// var links = [
//   { source: '韦家碾', target: '升仙湖', lineStyle: { color: '#EE1822' } },
//   { source: '升仙湖', target: '火车北站', lineStyle: { color: '#EE1822' } },
//   { source: '火车北站', target: '人民北路', lineStyle: { color: '#EE1822' } },
//   { source: '人民北路', target: '文殊院', lineStyle: { color: '#EE1822' } },
//   { source: '文殊院', target: '骡马市', lineStyle: { color: '#EE1822' } },
//   { source: '骡马市', target: '天府广场', lineStyle: { color: '#EE1822' } },
//   { source: '天府广场', target: '锦江宾馆', lineStyle: { color: '#EE1822' } },
//   { source: '锦江宾馆', target: '华西坝', lineStyle: { color: '#EE1822' } },
//   { source: '华西坝', target: '省体育馆', lineStyle: { color: '#EE1822' } },
//   { source: '省体育馆', target: '倪家桥', lineStyle: { color: '#EE1822' } },
//   { source: '倪家桥', target: '桐梓林', lineStyle: { color: '#EE1822' } },
//   { source: '桐梓林', target: '火车南站', lineStyle: { color: '#EE1822' } },
//   { source: '火车南站', target: '高新', lineStyle: { color: '#EE1822' } },
//   { source: '高新', target: '金融城', lineStyle: { color: '#EE1822' } },
//   { source: '金融城', target: '孵化园', lineStyle: { color: '#EE1822' } },
//   { source: '孵化园', target: '锦城广场', lineStyle: { color: '#EE1822' } },
//   { source: '锦城广场', target: '世纪城', lineStyle: { color: '#EE1822' } },
//   { source: '世纪城', target: '天府三街', lineStyle: { color: '#EE1822' } },
//   { source: '天府三街', target: '天府五街', lineStyle: { color: '#EE1822' } },
//   { source: '天府五街', target: '华府大道', lineStyle: { color: '#EE1822' } },
//   { source: '华府大道', target: '四河', lineStyle: { color: '#EE1822' } },
//   { source: '四河', target: '广都', lineStyle: { color: '#EE1822' } },
//   { source: '广都', target: '五根松', lineStyle: { color: '#EE1822' } },
//   { source: '韦家碾', target: '升仙湖', lineStyle: { color: '#EE1822' } },
//   { source: '升仙湖', target: '火车北站', lineStyle: { color: '#EE1822' } },
//   { source: '火车北站', target: '人民北路', lineStyle: { color: '#EE1822' } },
//   { source: '人民北路', target: '文殊院', lineStyle: { color: '#EE1822' } },
//   { source: '文殊院', target: '骡马市', lineStyle: { color: '#EE1822' } },
//   { source: '骡马市', target: '天府广场', lineStyle: { color: '#EE1822' } },
//   { source: '天府广场', target: '锦江宾馆', lineStyle: { color: '#EE1822' } },
//   { source: '锦江宾馆', target: '华西坝', lineStyle: { color: '#EE1822' } },
//   { source: '华西坝', target: '省体育馆', lineStyle: { color: '#EE1822' } },
//   { source: '省体育馆', target: '倪家桥', lineStyle: { color: '#EE1822' } },
//   { source: '倪家桥', target: '桐梓林', lineStyle: { color: '#EE1822' } },
//   { source: '桐梓林', target: '火车南站', lineStyle: { color: '#EE1822' } },
//   { source: '火车南站', target: '高新', lineStyle: { color: '#EE1822' } },
//   { source: '高新', target: '金融城', lineStyle: { color: '#EE1822' } },
//   { source: '金融城', target: '孵化园', lineStyle: { color: '#EE1822' } },
//   { source: '孵化园', target: '锦城广场', lineStyle: { color: '#EE1822' } },
//   { source: '锦城广场', target: '世纪城', lineStyle: { color: '#EE1822' } },
//   { source: '世纪城', target: '天府三街', lineStyle: { color: '#EE1822' } },
//   { source: '天府三街', target: '天府五街', lineStyle: { color: '#EE1822' } },
//   { source: '天府五街', target: '华府大道', lineStyle: { color: '#EE1822' } },
//   { source: '华府大道', target: '四河', lineStyle: { color: '#EE1822' } },
//   { source: '四河', target: '华阳', lineStyle: { color: '#EE1822' } },
//   { source: '华阳', target: '海昌路', lineStyle: { color: '#EE1822' } },
//   { source: '海昌路', target: '广福', lineStyle: { color: '#EE1822' } },
//   { source: '广福', target: '红石公园', lineStyle: { color: '#EE1822' } },
//   { source: '红石公园', target: '麓湖', lineStyle: { color: '#EE1822' } },
//   { source: '麓湖', target: '武汉路', lineStyle: { color: '#EE1822' } },
//   { source: '武汉路', target: '天府公园', lineStyle: { color: '#EE1822' } },
//   { source: '天府公园', target: '西博城', lineStyle: { color: '#EE1822' } },
//   { source: '西博城', target: '广州路', lineStyle: { color: '#EE1822' } },
//   { source: '广州路', target: '兴隆湖', lineStyle: { color: '#EE1822' } },
//   { source: '兴隆湖', target: '科学城', lineStyle: { color: '#EE1822' } },
//   { source: '犀浦', target: '天河路', lineStyle: { color: '#85C73F' } },
//   { source: '天河路', target: '百草路', lineStyle: { color: '#85C73F' } },
//   { source: '百草路', target: '金周路', lineStyle: { color: '#85C73F' } },
//   { source: '金周路', target: '金科北路', lineStyle: { color: '#85C73F' } },
//   { source: '金科北路', target: '迎宾大道', lineStyle: { color: '#85C73F' } },
//   { source: '迎宾大道', target: '茶店子客运站', lineStyle: { color: '#85C73F' } },
//   { source: '茶店子客运站', target: '羊犀立交', lineStyle: { color: '#85C73F' } },
//   { source: '羊犀立交', target: '一品天下', lineStyle: { color: '#85C73F' } },
//   { source: '一品天下', target: '蜀汉路东', lineStyle: { color: '#85C73F' } },
//   { source: '蜀汉路东', target: '白果林', lineStyle: { color: '#85C73F' } },
//   { source: '白果林', target: '中医大省医院', lineStyle: { color: '#85C73F' } },
//   { source: '中医大省医院', target: '通惠门', lineStyle: { color: '#85C73F' } },
//   { source: '通惠门', target: '人民公园', lineStyle: { color: '#85C73F' } },
//   { source: '人民公园', target: '天府广场', lineStyle: { color: '#85C73F' } },
//   { source: '天府广场', target: '春熙路', lineStyle: { color: '#85C73F' } },
//   { source: '春熙路', target: '东门大桥', lineStyle: { color: '#85C73F' } },
//   { source: '东门大桥', target: '牛王庙', lineStyle: { color: '#85C73F' } },
//   { source: '牛王庙', target: '牛市口', lineStyle: { color: '#85C73F' } },
//   { source: '牛市口', target: '东大路', lineStyle: { color: '#85C73F' } },
//   { source: '东大路', target: '塔子山公园', lineStyle: { color: '#85C73F' } },
//   { source: '塔子山公园', target: '成都东客站', lineStyle: { color: '#85C73F' } },
//   { source: '成都东客站', target: '成渝立交', lineStyle: { color: '#85C73F' } },
//   { source: '成渝立交', target: '惠王陵', lineStyle: { color: '#85C73F' } },
//   { source: '惠王陵', target: '洪河', lineStyle: { color: '#85C73F' } },
//   { source: '洪河', target: '成都行政学院', lineStyle: { color: '#85C73F' } },
//   { source: '成都行政学院', target: '大面铺', lineStyle: { color: '#85C73F' } },
//   { source: '大面铺', target: '连山坡', lineStyle: { color: '#85C73F' } },
//   { source: '连山坡', target: '界牌', lineStyle: { color: '#85C73F' } },
//   { source: '界牌', target: '书房', lineStyle: { color: '#85C73F' } },
//   { source: '书房', target: '龙平路', lineStyle: { color: '#85C73F' } },
//   { source: '龙平路', target: '龙泉驿', lineStyle: { color: '#85C73F' } },
//   { source: '太平园', target: '红牌楼', lineStyle: { color: '#FDD303' } },
//   { source: '红牌楼', target: '高升桥', lineStyle: { color: '#FDD303' } },
//   { source: '高升桥', target: '衣冠庙', lineStyle: { color: '#FDD303' } },
//   { source: '衣冠庙', target: '省体育馆', lineStyle: { color: '#FDD303' } },
//   { source: '省体育馆', target: '磨子桥', lineStyle: { color: '#FDD303' } },
//   { source: '磨子桥', target: '新南门', lineStyle: { color: '#FDD303' } },
//   { source: '新南门', target: '春熙路', lineStyle: { color: '#FDD303' } },
//   { source: '春熙路', target: '市二医院', lineStyle: { color: '#FDD303' } },
//   { source: '市二医院', target: '红星桥', lineStyle: { color: '#FDD303' } },
//   { source: '红星桥', target: '前锋路', lineStyle: { color: '#FDD303' } },
//   { source: '前锋路', target: '李家沱', lineStyle: { color: '#FDD303' } },
//   { source: '李家沱', target: '驷马桥', lineStyle: { color: '#FDD303' } },
//   { source: '驷马桥', target: '昭觉寺南路', lineStyle: { color: '#FDD303' } },
//   { source: '昭觉寺南路', target: '动物园', lineStyle: { color: '#FDD303' } },
//   { source: '动物园', target: '熊猫大道', lineStyle: { color: '#FDD303' } },
//   { source: '熊猫大道', target: '军区总医院', lineStyle: { color: '#FDD303' } },
//   { source: '马厂坝', target: '凤凰大街', lineStyle: { color: '#4E2C8D' } },
//   { source: '凤凰大街', target: '涌泉', lineStyle: { color: '#4E2C8D' } },
//   { source: '涌泉', target: '光华公园', lineStyle: { color: '#4E2C8D' } },
//   { source: '光华公园', target: '南熏大道', lineStyle: { color: '#4E2C8D' } },
//   { source: '南熏大道', target: '凤溪河', lineStyle: { color: '#4E2C8D' } },
//   { source: '凤溪河', target: '杨柳河', lineStyle: { color: '#4E2C8D' } },
//   { source: '杨柳河', target: '万盛', lineStyle: { color: '#4E2C8D' } },
//   { source: '万盛', target: '非遗博览园', lineStyle: { color: '#4E2C8D' } },
//   { source: '非遗博览园', target: '蔡桥', lineStyle: { color: '#4E2C8D' } },
//   { source: '蔡桥', target: '中坝', lineStyle: { color: '#4E2C8D' } },
//   { source: '中坝', target: '成都西站', lineStyle: { color: '#4E2C8D' } },
//   { source: '成都西站', target: '清江西路', lineStyle: { color: '#4E2C8D' } },
//   { source: '清江西路', target: '文化宫', lineStyle: { color: '#4E2C8D' } },
//   { source: '文化宫', target: '西南财大', lineStyle: { color: '#4E2C8D' } },
//   { source: '西南财大', target: '草堂北路', lineStyle: { color: '#4E2C8D' } },
//   { source: '草堂北路', target: '中医大省医院', lineStyle: { color: '#4E2C8D' } },
//   { source: '中医大省医院', target: '宽窄巷子', lineStyle: { color: '#4E2C8D' } },
//   { source: '宽窄巷子', target: '骡马市', lineStyle: { color: '#4E2C8D' } },
//   { source: '骡马市', target: '太升南路', lineStyle: { color: '#4E2C8D' } },
//   { source: '太升南路', target: '市二医院', lineStyle: { color: '#4E2C8D' } },
//   { source: '市二医院', target: '玉双路', lineStyle: { color: '#4E2C8D' } },
//   { source: '玉双路', target: '双桥路', lineStyle: { color: '#4E2C8D' } },
//   { source: '双桥路', target: '万年场', lineStyle: { color: '#4E2C8D' } },
//   { source: '万年场', target: '槐树店', lineStyle: { color: '#4E2C8D' } },
//   { source: '槐树店', target: '来龙', lineStyle: { color: '#4E2C8D' } },
//   { source: '来龙', target: '十陵', lineStyle: { color: '#4E2C8D' } },
//   { source: '十陵', target: '成都大学', lineStyle: { color: '#4E2C8D' } },
//   { source: '成都大学', target: '明蜀王陵', lineStyle: { color: '#4E2C8D' } },
//   { source: '明蜀王陵', target: '西河', lineStyle: { color: '#4E2C8D' } },
//   { source: '太平园', target: '簇锦', lineStyle: { color: '#B8A8CF' } },
//   { source: '簇锦', target: '华兴', lineStyle: { color: '#B8A8CF' } },
//   { source: '华兴', target: '金花', lineStyle: { color: '#B8A8CF' } },
//   { source: '金花', target: '双流机场1航站楼', lineStyle: { color: '#B8A8CF' } },
//   { source: '双流机场1航站楼', target: '双流机场2航站楼', lineStyle: { color: '#B8A8CF' } },
//   { source: '高朋大道', target: '神仙树', lineStyle: { color: '#F26F1F' } },
//   { source: '神仙树', target: '火车南站', lineStyle: { color: '#F26F1F' } },
//   { source: '火车南站', target: '三瓦窑', lineStyle: { color: '#F26F1F' } },
//   { source: '三瓦窑', target: '琉璃场', lineStyle: { color: '#F26F1F' } },
//   { source: '琉璃场', target: '四川师大', lineStyle: { color: '#F26F1F' } },
//   { source: '四川师大', target: '狮子山', lineStyle: { color: '#F26F1F' } },
//   { source: '狮子山', target: '大观', lineStyle: { color: '#F26F1F' } },
//   { source: '大观', target: '成都东客站', lineStyle: { color: '#F26F1F' } },
//   { source: '成都东客站', target: '迎晖路', lineStyle: { color: '#F26F1F' } },
//   { source: '迎晖路', target: '槐树店', lineStyle: { color: '#F26F1F' } },
//   { source: '槐树店', target: '双店路', lineStyle: { color: '#F26F1F' } },
//   { source: '双店路', target: '崔家店', lineStyle: { color: '#F26F1F' } },
//   { source: '崔家店', target: '理工大学', lineStyle: { color: '#F26F1F' } },
//   { source: '理工大学', target: '二仙桥', lineStyle: { color: '#F26F1F' } },
//   { source: '二仙桥', target: '八里庄', lineStyle: { color: '#F26F1F' } },
//   { source: '八里庄', target: '府青路', lineStyle: { color: '#F26F1F' } },
//   { source: '府青路', target: '驷马桥', lineStyle: { color: '#F26F1F' } },
//   { source: '驷马桥', target: '火车北站', lineStyle: { color: '#F26F1F' } },
//   { source: '火车北站', target: '北站西二路', lineStyle: { color: '#F26F1F' } },
//   { source: '北站西二路', target: '九里堤', lineStyle: { color: '#F26F1F' } },
//   { source: '九里堤', target: '西南交大', lineStyle: { color: '#F26F1F' } },
//   { source: '西南交大', target: '花照壁', lineStyle: { color: '#F26F1F' } },
//   { source: '花照壁', target: '茶店子', lineStyle: { color: '#F26F1F' } },
//   { source: '茶店子', target: '一品天下', lineStyle: { color: '#F26F1F' } },
//   { source: '一品天下', target: '金沙博物馆', lineStyle: { color: '#F26F1F' } },
//   { source: '金沙博物馆', target: '文化宫', lineStyle: { color: '#F26F1F' } },
//   { source: '文化宫', target: '东坡路', lineStyle: { color: '#F26F1F' } },
//   { source: '东坡路', target: '龙爪堰', lineStyle: { color: '#F26F1F' } },
//   { source: '龙爪堰', target: '武侯大道', lineStyle: { color: '#F26F1F' } },
//   { source: '武侯大道', target: '太平园', lineStyle: { color: '#F26F1F' } },
// ];

// var lineNames = [];

// for (var index = 0; index < stations.length - 1; index++) {
//   if (lineNames.indexOf(stations[index].category) == -1) {
//     lineNames.push(stations[index].category);
//   }
// }

// var legend = [
//   {
//     data: lineNames,
//   },
// ];

// var categories = lineNames.map((lineName) => {
//   return {
//     name: lineName,
//   };
// });

// // @ts-ignore
// export const option = {
//   title: {
//     // text: '成都地铁示意图',
//   },
//   color: [
//     '#EE1822',
//     '#85C73F',
//     '#FDD303',
//     '#4E2C8D',
//     '#8F57A2',
//     '#D7156B',
//     '#F26F1F',
//     '#009DD7',
//     '#67CCF6',
//     '#B8A8CF',
//     '#7C1F31',
//     '#54ae11',
//     '#E77DAD',
//     '#78d6cd',
//     '#bc796f',
//   ],
//   tooltip: {},
//   legend: legend,
//   animationDurationUpdate: 1500,
//   animationEasingUpdate: 'quinticInOut',
//   series: [
//     {
//       type: 'graph',
//       layout: 'none',
//       symbolSize: 6,
//       focusNodeAdjacency: true,
//       roam: true,
//       label: {
//         show: true,
//         rotate: '30',
//         color: 'black',
//         position: 'right',
//       },
//       edgeSymbol: ['none', 'none'],
//       edgeSymbolSize: [4, 6],
//       edgeLabel: {
//         normal: {
//           textStyle: {
//             fontSize: 20,
//           },
//         },
//       },
//       data: stations,
//       zoom: 3,
//       top: 250,
//       links: links,
//       categories: categories,
//       lineStyle: {
//         normal: {
//           opacity: 0.9,
//           width: 6,
//           curveness: 0,
//         },
//       },
//     },
//   ],
// };