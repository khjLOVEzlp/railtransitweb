import * as echarts from 'echarts';

export const data = [
  {
    name: "21号线",
    tooltip: {
      formatter: "{b}: 19999<br />",
    },
    symbolSize: 0.1,
    value: [5, 750],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#5A7FFA",
      position: "bottom",
      fontSize: 18,
      fontWeight: 1000,
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#5A7FFA",
          },
          {
            offset: 1,
            color: "#5A7FFA",
          },
        ]),
      },
    },
  },
  {
    name: "广佛线",
    tooltip: {
      formatter: "{b}: 19999<br />",
    },
    symbolSize: 0.1,
    value: [780, 1050],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#5A7FFA",
      position: "bottom",
      fontSize: 18,
      fontWeight: 1000,
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#5A7FFA",
          },
          {
            offset: 1,
            color: "#5A7FFA",
          },
        ]),
      },
    },
  },

  //地铁一号线，站点间X轴坐标相差50，Y轴坐标相同
  {
    name: "天河公园",
    tooltip: {
      formatter: "{b}: 19999<br />",
    },
    symbol: "circle",
    symbolSize: [25, 25],
    value: [5, 600],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "棠东",
    x: 400,
    y: 400,
    value: [80, 600],
    fixed: true,
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    category: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },

  {
    name: "黄村",
    x: 1000,
    y: 1000,
    value: [130, 600],
    fixed: true,
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    category: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "大观南路",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [180, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "天河智慧城",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [230, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "神州路",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [280, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "科学城",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [330, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "苏园",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [380, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "水西",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [430, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "长平",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [480, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#989EAC",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "金坑",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [530, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "镇龙西",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [580, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "镇龙",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [630, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "中新",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [680, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#157eff",
          },
        ]),
      },
    },
  },
  {
    name: "坑贝站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [730, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#157eff",
          },
        ]),
      },
    },
  },
  {
    name: "凤岗站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [780, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "朱村",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [830, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "山田站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [880, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#157eff",
          },
        ]),
      },
    },
  },
  {
    name: "钟岗站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "bottom",
    },
    value: [930, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  {
    name: "增城广场",
    symbol: "circle",
    symbolSize: [20, 20],
    label: {
      color: "#989EAC",
      position: "top",
    },
    value: [980, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#157eff",
          },
          {
            offset: 1,
            color: "#35c2ff",
          },
        ]),
      },
    },
  },
  //地铁二号线，垂直线路，站点间X轴坐标相同，Y轴坐标相差50
  {
    name: "沥滘站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "left",
    },
    value: [680, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#FFD876",
          },
          {
            offset: 1,
            color: "#FFD876",
          },
        ]),
      },
    },
  },
  {
    name: "南洲站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "left",
    },
    value: [680, 400],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#FFD876",
          },
          {
            offset: 1,
            color: "#FFD876",
          },
        ]),
      },
    },
  },
  {
    name: "石溪站",
    symbol: "circle",
    symbolSize: [15, 15],
    label: {
      color: "#989EAC",
      position: "left",
    },
    value: [680, 1000],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "#FFD876",
          },
          {
            offset: 1,
            color: "#FFD876",
          },
        ]),
      },
    },
  },
];

export const track = {
  title: {
    text: "广州地铁路线",
    textStyle: {
      color: "#5A7FFA",
      fontSize: 20,
    },
    x: "center",
    top: 10,
  },
  //不设置背景颜色就是透明
  xAxis: {
    show: false,
    min: 0,
    max: 1200,
    // type: "value",
    //开启x轴坐标
    axisPointer: {
      show: true,
    },
  },
  yAxis: {
    show: false,
    min: 0,
    max: 1200,
    //   type: "value",
    //开启y轴坐标
    axisPointer: {
      show: true,
    },
  },
  tooltip: {},
  //  legend: {
  //     show: false
  //  },
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
      symbolOffset: ["15%", 0],

      label: {
        normal: {
          show: true,
        },
      },
      data: data,
      links: [
        {
          source: "天河公园",
          target: "棠东",
          // lineStyle: {
          //   normal: {
          //     color: "#12b5d0",
          //
          //   }
          // }
        },
        {
          source: "棠东",
          target: "黄村",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "黄村",
          target: "大观南路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "大观南路",
          target: "天河智慧城",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },

        {
          source: "天河智慧城",
          target: "神州路",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },

        {
          source: "神州路",
          target: "科学城",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },

        {
          source: "科学城",
          target: "苏园",
          // lineStyle: {
          //   normal: {
          //     color: "#12b5d0",
          //
          //   }
          // }
        },
        {
          source: "苏园",
          target: "水西",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "水西",
          target: "长平",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "长平",
          target: "金坑",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "金坑",
          target: "镇龙西",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "镇龙西",
          target: "镇龙",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "镇龙",
          target: "中新",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "中新",
          target: "坑贝站",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "坑贝站",
          target: "凤岗站",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "凤岗站",
          target: "朱村",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "朱村",
          target: "山田站",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "山田站",
          target: "钟岗站",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        {
          source: "钟岗站",
          target: "增城广场",
          lineStyle: {
            normal: {
              // color: "#12b5d0",
            },
          },
        },
        //地铁二号线连接
        {
          source: "沥滘站",
          target: "南洲站",
          lineStyle: {
            normal: {
              color: "#FFD876",
            },
          },
        },
        {
          source: "南洲站",
          target: "石溪站",
          lineStyle: {
            normal: {
              color: "#FFD876",
            },
          },
        }
      ],
      lineStyle: {
        normal: {
          opacity: 0.6, //线条透明度
          color: "#53B5EA",
          curveness: 0, //站点间连线曲度，0表示直线
          width: 10, //线条宽度
        },
      },
    },
    {
      type: "lines",
      coordinateSystem: "cartesian2d",
      z: 1,
      zlevel: 7,
      animation: true,
      effect: {
        show: true,
        period: 5,
        trailLength: 0.71,
        symbolSize: 14,
        symbol: "circle",
        loop: true,
        // color: "yellow",
        //   color: "rgba(55,155,255,0.5)"
      },
      lineStyle: {
        normal: {
          // color: "green",
          width: 0,
          curveness: 0, //动画线路的曲度
        },
      },

      data: [
        {
          //一号线
          coords: [
            [5, 600],
            [980, 600],
          ],
        },
        {
          //二号线
          coords: [
            [680, 50],
            [680, 1000],
          ],
        },
      ],
    },
  ],
};

export const mounthConfigData = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "告警",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {value: 500, name: "过时"},
        {value: 735, name: "低电"},
        {value: 580, name: "分离"},
        {value: 484, name: "遗漏"},
        {value: 300, name: "漏点"},
        {value: 300, name: "漏带"},
        {value: 300, name: "遗忘"},
        {value: 300, name: "离线"},
        {value: 300, name: "体温"},
        {value: 300, name: "喝酒"},
      ],
    },
  ],
};


export const options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "计划统计",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {value: 10, name: "日计划数"},
        {value: 20, name: "周计划数"},
        {value: 30, name: "月计划数"},
        {value: 120, name: "季度计划数"},
        {value: 180, name: "半年计划数"},
        {value: 360, name: "年计划数"}
      ],
    },
  ],
};

export const task = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "作业统计",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {value: 20, name: "日作业数"},
        {value: 30, name: "周作业数"},
        {value: 40, name: "月作业数"},
        {value: 50, name: "季度作业数"},
        {value: 60, name: "年度作业数"}
      ],
    },
  ],
};