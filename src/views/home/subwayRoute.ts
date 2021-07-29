import * as echarts from 'echarts';

const color = "#989EAC"

const data = [
  {
    name: "21号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [-80, 1400],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#5A7FFA",
      position: 'bottom',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "广佛线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [500, 1300],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#FFD876",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "9号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [90, 1200],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#99C857",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "2号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [60, 900],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#0066CC",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "13号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [160, 500],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#A7B942",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "14号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [1000, 1000],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#721920",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "4号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [1200, 1000],
    x: 1000,
    y: 1000,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#721920",
      position: 'top',
      fontSize: 18,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  /*
  {
    name: "地铁二号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [855, 1050],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "red",
      position: 'bottom',
      fontSize: 24,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "地铁三号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [280, 250],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#FF00FF",
      position: 'bottom',
      fontSize: 24,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },*/
  /*{
    name: "地铁四号线",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [1040, 140],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#48D1CC",
      position: 'bottom',
      fontSize: 24,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
          {
            offset: 1,
            color: "#35c2ff"
          }
        ])
      }
    }
  },
  {
    name: "机场城际",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbolSize: 0.1,
    value: [20, 1050],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: "#20B2AA",
      position: 'bottom',
      fontSize: 24,
      fontWeight: 1000
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
          {
            offset: 1,
            color: "#35c2ff"
          }
        ])
      }
    }
  },*/
  //21号线，站点间X轴坐标相差50，Y轴坐标相同
  {
    name: "天河公园",
    tooltip: {
      formatter: "{b}: 19999<br />"
    },
    symbol: 'circle',
    symbolSize: [10, 10],
    value: [0, 1200],
    x: 800,
    y: 400,
    fixed: true,
    // draggable: false,
    category: 1,
    label: {
      color: color,
      position: 'left',
    },
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "棠东",
    x: 400,
    y: 400,
    value: [0, 1050],
    fixed: true,
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    category: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  {
    name: "黄村",
    x: 1000,
    y: 1000,
    value: [-30, 900],
    fixed: true,
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    category: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "大观南路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [-50, 750],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "天河智慧城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [-50, 600],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "神舟路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [-50, 450],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "科学城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [-30, 300],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "苏元",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [-10, 150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "水西",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [100, 150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "长平",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [200, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "金坑",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [300, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "镇龙西",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [400, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "镇龙",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [500, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "中新",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [600, 150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "坑贝站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [700, 250],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "凤岗站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [700, 400],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "朱村",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [700, 550],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "山田站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [800, 550],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "钟岗站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [900, 550],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },
  {
    name: "增城广场",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [1000, 450],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#157eff"
        },
        {
          offset: 1,
          color: "#35c2ff"
        }
        ])
      }
    }
  },

  //广佛线，垂直线路，站点间X轴坐标相同，Y轴坐标相差50
  {
    name: "石溪站",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'right',
    },
    value: [500, 1200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "南洲站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 540],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "沥滘站",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },

  //9号线，垂直线路，站点间X轴坐标相同，Y轴坐标相差50
  {
    name: "飞鹅岭",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'right',
    },
    value: [500, 1200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "花都汽车城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 540],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "广州北站",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "花城路",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "花果山公园",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "花都广场",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "马鞍山公园",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "莲塘",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "清布",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "清塘",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "高增",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },

  // 2号线
  {
    name: "嘉禾望岗",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "黄边",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "江夏",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "萧岗",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "白云文化广场",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "白云公园",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "飞翔公园",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "三里元",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "越秀公园",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "纪念堂",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "公园前",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "海珠广场",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "市二宫",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "江南西",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "昌岗",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "江泰路",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "东晓南",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "南洲",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "洛溪",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "南浦",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "会江",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "石壁",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },
  {
    name: "广州南站",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [500, 0],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFEDC1"
        },
        {
          offset: 1,
          color: "#FFEDC1"
        }
        ])
      }
    }
  },


  /*//广佛线，垂直线路，站点间X轴坐标相同，Y轴坐标相差50
  {
    name: "钟楼",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 540],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "永宁门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 500],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "南稍门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 450],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "体育场",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 400],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "小寨",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#FF1493"
        },
        {
          offset: 1,
          color: "#0000FF"
        }
        ])
      }
    }
  },
  {
    name: "纬一街",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 300],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "会展中心",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 250],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "三爻",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "凤栖原",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "航天城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 100],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "韦曲南",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 50],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "安远门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 660],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "龙首原",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 700],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "大明宫西",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 750],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "市图书馆",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 800],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "凤城五路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 850],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "行政中心",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 900],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#FF1493"
        },
        {
          offset: 1,
          color: "#0000FF"
        }
        ])
      }
    }
  },
  {
    name: "运动公园",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 950],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "北苑",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 1000],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  {
    name: "北客站",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'left',
    },
    value: [680, 1050],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "red"
        },
        {
          offset: 1,
          color: "red"
        }
        ])
      }
    }
  },
  //地铁三号线
  {
    name: "吉祥村",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [580, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "太白南路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [520, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "科技路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [460, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "延平门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [400, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "丈八北路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [340, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "鱼化寨",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [280, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "大雁塔",
    symbol: 'circle',
    symbolSize: [10, 10],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [730, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          offset: 0,
          color: "#FF1493"
        },
        {
          offset: 1,
          color: "#0000FF"
        }
        ])
      }
    }
  },
  {
    name: "北池头",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [800, 350],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "青龙寺",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [850, 370],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "延兴门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [880, 400],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "咸宁路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [880, 450],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "长乐公园",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [880, 500],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "胡家庙",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [880, 660],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "石家街",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [880, 700],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "辛家庙",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [900, 750],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "广泰门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'top',
    },
    value: [960, 755],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "桃花潭",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [1000, 757],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "浐灞中心",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 780],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "香湖湾",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 830],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "务庄",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 880],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "国际港务区",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 930],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "双寨",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 980],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "新筑",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 1030],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },
  {
    name: "保税区",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'right',
    },
    value: [1040, 1080],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FF00FF"
        },
        {
          offset: 1,
          color: "#FF00FF"
        }
        ])
      }
    }
  },*/
  //地铁四号线
  /*{
    name: "大唐芙蓉园",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 300],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "曲江池西",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 250],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "金滹沱",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 200],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "航天大道",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "飞天路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 100],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "东长安街",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 50],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "神舟大道",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [820, 30],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "航天东路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [920, 30],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "航天新城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [1020, 30],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "西安科技大学",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 400],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "建筑科技大学",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 450],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "和平门",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 500],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "大差市",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 550],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "火车站",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 660],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "含元殿",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 695],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "大明宫",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 735],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "大明宫北",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 770],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "余家寨",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 805],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "百花村",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 835],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "常青路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [730, 865],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "市中医院",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [710, 890],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "文景路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [550, 900],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "凤城九路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [530, 930],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "凤城十二路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [530, 970],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "元朔路",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [530, 1010],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },
  {
    name: "北客站(北广场)",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'right',
    },
    value: [640, 1100],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#48D1CC"
        },
          {
            offset: 1,
            color: "#48D1CC"
          }
        ])
      }
    }
  },*/
  //机场城际
  /*{
    name: "渭河南",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [530, 1120],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "秦宫",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'left',
    },
    value: [450, 1145],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "秦汉新城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [380, 1105],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "长陵",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [310, 1080],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "摆旗寨",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [230, 1070],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "艺术中心",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [170, 1100],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "空港新城",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [120, 1150],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "机场（T5）",
    symbol: 'circle',
    symbolSize: [0, 0],
    label: {
      color: color,
      position: 'right',
    },
    value: [80, 1190],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },
  {
    name: "机场西（T1、T2、T3）",
    symbol: 'circle',
    symbolSize: [25, 25],
    label: {
      color: color,
      position: 'bottom',
    },
    value: [20, 1130],
    x: 1000,
    y: 1000,
    fixed: true,
    category: 2,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#20B2AA"
        },
          {
            offset: 1,
            color: "#20B2AA"
          }
        ])
      }
    }
  },*/
];

// export const option = ({
//   title: {
//     text: '',
//     textStyle: {
//       color: '#1890ff',
//       fontSize: 20
//     },
//     x: 'center',
//     top: 10
//   },
//   //不设置背景颜色就是透明色
//   xAxis: {
//     show: false,
//     min: 0,
//     max: 1200,
//     // type: "value",
//     //开启x轴坐标
//     axisPointer: {
//       show: false
//     },
//   },
//   yAxis: {
//     show: false,
//     min: 0,
//     max: 1200,
//     //   type: "value",
//     //开启y轴坐标
//     axisPointer: {
//       show: false
//     },
//   },
//   tooltip: {},
//   //  legend: {
//   //     show: false
//   //  },
//   series: [{
//     type: "graph",
//     zlevel: 5,
//     draggable: false,
//     coordinateSystem: "cartesian2d", //使用二维的直角坐标系（也称笛卡尔坐标系）

//     // edgeSymbolSize: [0, 8], //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
//     // edgeLabel: {
//     //   normal: {
//     //     textStyle: {
//     //       fontSize: 60
//     //     }
//     //   }
//     // },
//     symbol: "rect",
//     symbolOffset: ["15%", 0],

//     label: {
//       normal: {
//         show: true
//       }
//     },
//     data: data,
//     links: [{
//       source: "天河公园",
//       target: "棠东"
//       // lineStyle: {
//       //   normal: {
//       //     color: "#12b5d0",
//       //
//       //   }
//       // }
//     },
//     {
//       source: "棠东",
//       target: "黄村",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "黄村",
//       target: "大观南路",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "大观南路",
//       target: "天河智慧城",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },

//     {
//       source: "天河智慧城",
//       target: "神舟路",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },

//     {
//       source: "神舟路",
//       target: "科学城",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },

//     {
//       source: "科学城",
//       target: "苏元"
//       // lineStyle: {
//       //   normal: {
//       //     color: "#12b5d0",
//       //
//       //   }
//       // }
//     },
//     {
//       source: "苏元",
//       target: "水西",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "水西",
//       target: "长平",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "长平",
//       target: "金坑",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "金坑",
//       target: "镇龙西",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "镇龙西",
//       target: "镇龙",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "镇龙",
//       target: "中新",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "中新",
//       target: "坑贝站",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "坑贝站",
//       target: "凤岗站",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "凤岗站",
//       target: "朱村",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "朱村",
//       target: "山田站",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "山田站",
//       target: "钟岗站",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     {
//       source: "钟岗站",
//       target: "增城广场",
//       lineStyle: {
//         normal: {
//           // color: "#12b5d0",
//         }
//       }
//     },
//     //广佛线连接
//     {
//       source: "石溪站",
//       target: "南洲站",
//       lineStyle: {
//         normal: {
//           color: "#FFE197",
//         }
//       }
//     },
//     {
//       source: "南洲站",
//       target: "沥滘站",
//       lineStyle: {
//         normal: {
//           color: "#FFE197",
//         }
//       }
//     },
//     //9号线连接
//     {
//       source: "飞蛾岭",
//       target: "花都汽车城",
//       lineStyle: {
//         normal: {
//           color: "#FFE197",
//         }
//       }
//     },
//     {
//       source: "花都汽车城",
//       target: "广州北站",
//       lineStyle: {
//         normal: {
//           color: "#FFE197",
//         }
//       }
//     },
//     {
//       source: "广州北站",
//       target: "花城路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "花城路",
//       target: "花果山公园",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "花果山公园",
//       target: "花都广场",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "花都广场",
//       target: "马鞍山公园",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "马鞍山公园",
//       target: "莲塘",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "莲塘",
//       target: "清布",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "清布",
//       target: "清塘",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "清塘",
//       target: "高增",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },

//     // 
//     {
//       source: "大唐芙蓉园",
//       target: "大雁塔",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "大雁塔",
//       target: "西安科技大学",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "西安科技大学",
//       target: "建筑科技大学",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "建筑科技大学",
//       target: "和平门",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "和平门",
//       target: "大差市",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "大差市",
//       target: "五路口",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "五路口",
//       target: "火车站",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "火车站",
//       target: "含元殿",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "含元殿",
//       target: "大明宫",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "大明宫",
//       target: "大明宫北",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "大明宫北",
//       target: "余家寨",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "余家寨",
//       target: "百花村",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "百花村",
//       target: "常青路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "常青路",
//       target: "市中医院",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "市中医院",
//       target: "行政中心",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "行政中心",
//       target: "文景路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "文景路",
//       target: "凤城九路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "凤城九路",
//       target: "凤城十二路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "凤城十二路",
//       target: "元朔路",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "元朔路",
//       target: "北客站(北广场)",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     //机场城际各站点连线
//     {
//       source: "北客站(北广场)",
//       target: "渭河南",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "渭河南",
//       target: "秦宫",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "秦宫",
//       target: "秦汉新城",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "秦汉新城",
//       target: "长陵",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "长陵",
//       target: "摆旗寨",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "摆旗寨",
//       target: "艺术中心",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "艺术中心",
//       target: "空港新城",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "空港新城",
//       target: "机场（T5）",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     {
//       source: "机场（T5）",
//       target: "机场西（T1、T2、T3）",
//       lineStyle: {
//         normal: {
//           color: "#48D1CC",
//         }
//       }
//     },
//     ],
//     lineStyle: {
//       normal: {
//         opacity: 0.6, //线条透明度
//         color: "#6A9EFD",
//         curveness: 0, //站点间连线曲度，0表示直线
//         width: 5 //线条宽度
//       }
//     }
//   },
//   {
//     type: "lines",
//     coordinateSystem: "cartesian2d",
//     z: 1,
//     zlevel: 7,
//     animation: true,
//     effect: {
//       show: true,
//       period: 5,
//       trailLength: 0.71,
//       symbolSize: 14,
//       symbol: "circle",
//       loop: true,
//       color: 'yellow'
//       //   color: "rgba(55,155,255,0.5)"
//     },
//     lineStyle: {
//       normal: {
//         // color: "green",
//         width: 0,
//         curveness: 0  //动画线路的曲度
//       }
//     },

//     data: [
//       // {  //一号线
//       //   coords: [
//       //     [5, 600],
//       //     [1130, 600]
//       //   ]
//       // },
//       // {  //二号线
//       //   coords: [
//       //     [680, 50],
//       //     [680, 1050]
//       //   ]
//       // },
//       //   {  //三号线
//       //     coords: [
//       //       [280, 350],
//       //       [1040, 1080]
//       //     ]
//       //   }
//     ]
//   },
//   ]
// })

var stations = [
  {
    name: '韦家碾',
    x: 109.55,
    y: -769.35,
    itemStyle: { borderColor: '#EE1822', color: 'white' },
    label: { rotate: 120 },
    category: '1号线',
  },
  { name: '升仙湖', x: 109.55, y: -669.35, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '火车北站', x: -28.95, y: -522.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '人民北路', x: -28.95, y: -411.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '文殊院', x: -96.55, y: -314.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '骡马市', x: -170.8, y: -240.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '天府广场', x: -170.8, y: -170.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '锦江宾馆', x: -170.8, y: -78.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '华西坝', x: -170.8, y: -5.95, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '省体育馆', x: -170.8, y: 69, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '倪家桥', x: -170.8, y: 120.15, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '桐梓林', x: -170.8, y: 181.7, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '火车南站', x: -170.8, y: 238.6, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '高新', x: -229.85, y: 380, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '金融城', x: -229.85, y: 453, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '孵化园', x: -229.85, y: 515.25, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '锦城广场', x: -195.85, y: 585.25, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '世纪城', x: -161.85, y: 645.5, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '天府三街', x: -161.85, y: 720, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '天府五街', x: -161.85, y: 795, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '华府大道', x: -161.85, y: 870, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '四河', x: -161.85, y: 945, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '广都', x: -121.85, y: 978, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '五根松', x: -81.85, y: 1018, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '华阳', x: -161.85, y: 1018, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '海昌路', x: -161.85, y: 1068, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '广福', x: -161.85, y: 1118, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '红石公园', x: -161.85, y: 1168, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '麓湖', x: -161.85, y: 1218, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '武汉路', x: -161.85, y: 1268, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '天府公园', x: -161.85, y: 1318, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '西博城', x: -161.85, y: 1368, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '广州路', x: -161.85, y: 1418, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '兴隆湖', x: -161.85, y: 1468, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '科学城', x: -161.85, y: 1518, itemStyle: { borderColor: '#EE1822', color: 'white' }, category: '1号线' },
  { name: '犀浦', x: -785.35, y: -965, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '天河路', x: -745.35, y: -915, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '百草路', x: -705.35, y: -865, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '金周路', x: -665.35, y: -815, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '金科北路', x: -620.35, y: -765, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '迎宾大道', x: -580.35, y: -715, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  {
    name: '茶店子客运站',
    x: -540.35,
    y: -660,
    itemStyle: { borderColor: '#85C73F', color: 'white' },
    category: '2号线',
  },
  { name: '羊犀立交', x: -591.35, y: -516.3, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '一品天下', x: -529.6, y: -452.7, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '蜀汉路东', x: -453.8, y: -370, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '白果林', x: -398.2, y: -308.45, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  {
    name: '中医大省医院',
    x: -352.5,
    y: -258.95,
    itemStyle: { borderColor: '#85C73F', color: 'white' },
    category: '2号线',
  },
  { name: '通惠门', x: -287.85, y: -207.25, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '人民公园', x: -224.5, y: -188.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '春熙路', x: -34, y: -140, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '东门大桥', x: 35.5, y: -124.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '牛王庙', x: 113.5, y: -104.1, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '牛市口', x: 196.15, y: -82.6, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '东大路', x: 227.7, y: -62.95, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '塔子山公园', x: 270.7, y: -44.65, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '成都东客站', x: 318.7, y: -44.2, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '成渝立交', x: 359.2, y: 5.8, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '惠王陵', x: 434.7, y: 97.8, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '洪河', x: 474.7, y: 147, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '成都行政学院', x: 519.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '大面铺', x: 582.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '连山坡', x: 648.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '界牌', x: 715.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '书房', x: 784.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '龙平路', x: 850.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '龙泉驿', x: 918.7, y: 200, itemStyle: { borderColor: '#85C73F', color: 'white' }, category: '2号线' },
  { name: '太平园', x: -528, y: 238.6, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '红牌楼', x: -430, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '高升桥', x: -345, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '衣冠庙', x: -239, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '磨子桥', x: -34, y: 69, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '新南门', x: -34, y: -62, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '市二医院', x: 2, y: -193, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '红星桥', x: 66, y: -290, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '前锋路', x: 123, y: -377, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '李家沱', x: 124, y: -444, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '驷马桥', x: 195, y: -524, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '昭觉寺南路', x: 242, y: -575, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '动物园', x: 292, y: -632, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '熊猫大道', x: 340, y: -686, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '军区总医院', x: 389, y: -742, itemStyle: { borderColor: '#FDD303', color: 'white' }, category: '3号线' },
  { name: '马厂坝', x: -894.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '凤凰大街', x: -975.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '涌泉', x: -1045.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '光华公园', x: -1106.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '南熏大道', x: -1170.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '凤溪河', x: -1236.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '杨柳河', x: -1299.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '万盛', x: -1368.5, y: -260.7, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '非遗博览园', x: -820, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '蔡桥', x: -724, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '中坝', x: -664, y: -262, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '成都西站', x: -604, y: -261, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '清江西路', x: -560, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '文化宫', x: -530, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '西南财大', x: -456.5, y: -260, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '草堂北路', x: -394.5, y: -259, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '宽窄巷子', x: -258, y: -242, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '太升南路', x: -82, y: -216, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '玉双路', x: 124, y: -160, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '双桥路', x: 192, y: -141, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '万年场', x: 255, y: -131, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '槐树店', x: 319.2, y: -110.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '来龙', x: 480.2, y: -98.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '十陵', x: 552.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '成都大学', x: 621.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '明蜀王陵', x: 683.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '西河', x: 745.2, y: -97.8, itemStyle: { borderColor: '#4E2C8D', color: 'white' }, category: '4号线' },
  { name: '簇锦', x: -580.6, y: 333.9, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
  { name: '华兴', x: -624.6, y: 408.9, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
  { name: '金花', x: -731.1, y: 482.4, itemStyle: { borderColor: '#B8A8CF', color: 'white' }, category: '10号线' },
  {
    name: '双流机场1航站楼',
    x: -839.6,
    y: 562,
    itemStyle: { borderColor: '#B8A8CF', color: 'white' },
    category: '10号线',
  },
  {
    name: '双流机场2航站楼',
    x: -882.9,
    y: 654.2,
    itemStyle: { borderColor: '#B8A8CF', color: 'white' },
    category: '10号线',
  },
  { name: '高朋大道', x: -445.8, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '神仙树', x: -353.5, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '三瓦窑', x: -52.3, y: 238.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '琉璃场', x: 56.7, y: 184.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '四川师大', x: 176.3, y: 128.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '狮子山', x: 258.6, y: 88.4, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '大观', x: 318.4, y: 59.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '迎晖路', x: 319.3, y: -80.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '双店路', x: 319.6, y: -201.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '崔家店', x: 319.6, y: -288.9, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '理工大学', x: 318.6, y: -368.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '二仙桥', x: 318.6, y: -453.4, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '八里庄', x: 318.1, y: -522.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '府青路', x: 254.2, y: -522.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '北站西二路', x: -92.3, y: -523, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '九里堤', x: -173.6, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '西南交大', x: -258.5, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '花照壁', x: -335.1, y: -523.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '茶店子', x: -409.6, y: -523.7, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  {
    name: '金沙博物馆',
    x: -529.8,
    y: -349.9,
    itemStyle: { borderColor: '#F26F1F', color: 'white' },
    category: '7号线',
  },
  { name: '东坡路', x: -529.7, y: -150.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '龙爪堰', x: -529.7, y: -43.3, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
  { name: '武侯大道', x: -529.7, y: 75.6, itemStyle: { borderColor: '#F26F1F', color: 'white' }, category: '7号线' },
];

var links = [
  { source: '韦家碾', target: '升仙湖', lineStyle: { color: '#EE1822' } },
  { source: '升仙湖', target: '火车北站', lineStyle: { color: '#EE1822' } },
  { source: '火车北站', target: '人民北路', lineStyle: { color: '#EE1822' } },
  { source: '人民北路', target: '文殊院', lineStyle: { color: '#EE1822' } },
  { source: '文殊院', target: '骡马市', lineStyle: { color: '#EE1822' } },
  { source: '骡马市', target: '天府广场', lineStyle: { color: '#EE1822' } },
  { source: '天府广场', target: '锦江宾馆', lineStyle: { color: '#EE1822' } },
  { source: '锦江宾馆', target: '华西坝', lineStyle: { color: '#EE1822' } },
  { source: '华西坝', target: '省体育馆', lineStyle: { color: '#EE1822' } },
  { source: '省体育馆', target: '倪家桥', lineStyle: { color: '#EE1822' } },
  { source: '倪家桥', target: '桐梓林', lineStyle: { color: '#EE1822' } },
  { source: '桐梓林', target: '火车南站', lineStyle: { color: '#EE1822' } },
  { source: '火车南站', target: '高新', lineStyle: { color: '#EE1822' } },
  { source: '高新', target: '金融城', lineStyle: { color: '#EE1822' } },
  { source: '金融城', target: '孵化园', lineStyle: { color: '#EE1822' } },
  { source: '孵化园', target: '锦城广场', lineStyle: { color: '#EE1822' } },
  { source: '锦城广场', target: '世纪城', lineStyle: { color: '#EE1822' } },
  { source: '世纪城', target: '天府三街', lineStyle: { color: '#EE1822' } },
  { source: '天府三街', target: '天府五街', lineStyle: { color: '#EE1822' } },
  { source: '天府五街', target: '华府大道', lineStyle: { color: '#EE1822' } },
  { source: '华府大道', target: '四河', lineStyle: { color: '#EE1822' } },
  { source: '四河', target: '广都', lineStyle: { color: '#EE1822' } },
  { source: '广都', target: '五根松', lineStyle: { color: '#EE1822' } },
  { source: '韦家碾', target: '升仙湖', lineStyle: { color: '#EE1822' } },
  { source: '升仙湖', target: '火车北站', lineStyle: { color: '#EE1822' } },
  { source: '火车北站', target: '人民北路', lineStyle: { color: '#EE1822' } },
  { source: '人民北路', target: '文殊院', lineStyle: { color: '#EE1822' } },
  { source: '文殊院', target: '骡马市', lineStyle: { color: '#EE1822' } },
  { source: '骡马市', target: '天府广场', lineStyle: { color: '#EE1822' } },
  { source: '天府广场', target: '锦江宾馆', lineStyle: { color: '#EE1822' } },
  { source: '锦江宾馆', target: '华西坝', lineStyle: { color: '#EE1822' } },
  { source: '华西坝', target: '省体育馆', lineStyle: { color: '#EE1822' } },
  { source: '省体育馆', target: '倪家桥', lineStyle: { color: '#EE1822' } },
  { source: '倪家桥', target: '桐梓林', lineStyle: { color: '#EE1822' } },
  { source: '桐梓林', target: '火车南站', lineStyle: { color: '#EE1822' } },
  { source: '火车南站', target: '高新', lineStyle: { color: '#EE1822' } },
  { source: '高新', target: '金融城', lineStyle: { color: '#EE1822' } },
  { source: '金融城', target: '孵化园', lineStyle: { color: '#EE1822' } },
  { source: '孵化园', target: '锦城广场', lineStyle: { color: '#EE1822' } },
  { source: '锦城广场', target: '世纪城', lineStyle: { color: '#EE1822' } },
  { source: '世纪城', target: '天府三街', lineStyle: { color: '#EE1822' } },
  { source: '天府三街', target: '天府五街', lineStyle: { color: '#EE1822' } },
  { source: '天府五街', target: '华府大道', lineStyle: { color: '#EE1822' } },
  { source: '华府大道', target: '四河', lineStyle: { color: '#EE1822' } },
  { source: '四河', target: '华阳', lineStyle: { color: '#EE1822' } },
  { source: '华阳', target: '海昌路', lineStyle: { color: '#EE1822' } },
  { source: '海昌路', target: '广福', lineStyle: { color: '#EE1822' } },
  { source: '广福', target: '红石公园', lineStyle: { color: '#EE1822' } },
  { source: '红石公园', target: '麓湖', lineStyle: { color: '#EE1822' } },
  { source: '麓湖', target: '武汉路', lineStyle: { color: '#EE1822' } },
  { source: '武汉路', target: '天府公园', lineStyle: { color: '#EE1822' } },
  { source: '天府公园', target: '西博城', lineStyle: { color: '#EE1822' } },
  { source: '西博城', target: '广州路', lineStyle: { color: '#EE1822' } },
  { source: '广州路', target: '兴隆湖', lineStyle: { color: '#EE1822' } },
  { source: '兴隆湖', target: '科学城', lineStyle: { color: '#EE1822' } },
  { source: '犀浦', target: '天河路', lineStyle: { color: '#85C73F' } },
  { source: '天河路', target: '百草路', lineStyle: { color: '#85C73F' } },
  { source: '百草路', target: '金周路', lineStyle: { color: '#85C73F' } },
  { source: '金周路', target: '金科北路', lineStyle: { color: '#85C73F' } },
  { source: '金科北路', target: '迎宾大道', lineStyle: { color: '#85C73F' } },
  { source: '迎宾大道', target: '茶店子客运站', lineStyle: { color: '#85C73F' } },
  { source: '茶店子客运站', target: '羊犀立交', lineStyle: { color: '#85C73F' } },
  { source: '羊犀立交', target: '一品天下', lineStyle: { color: '#85C73F' } },
  { source: '一品天下', target: '蜀汉路东', lineStyle: { color: '#85C73F' } },
  { source: '蜀汉路东', target: '白果林', lineStyle: { color: '#85C73F' } },
  { source: '白果林', target: '中医大省医院', lineStyle: { color: '#85C73F' } },
  { source: '中医大省医院', target: '通惠门', lineStyle: { color: '#85C73F' } },
  { source: '通惠门', target: '人民公园', lineStyle: { color: '#85C73F' } },
  { source: '人民公园', target: '天府广场', lineStyle: { color: '#85C73F' } },
  { source: '天府广场', target: '春熙路', lineStyle: { color: '#85C73F' } },
  { source: '春熙路', target: '东门大桥', lineStyle: { color: '#85C73F' } },
  { source: '东门大桥', target: '牛王庙', lineStyle: { color: '#85C73F' } },
  { source: '牛王庙', target: '牛市口', lineStyle: { color: '#85C73F' } },
  { source: '牛市口', target: '东大路', lineStyle: { color: '#85C73F' } },
  { source: '东大路', target: '塔子山公园', lineStyle: { color: '#85C73F' } },
  { source: '塔子山公园', target: '成都东客站', lineStyle: { color: '#85C73F' } },
  { source: '成都东客站', target: '成渝立交', lineStyle: { color: '#85C73F' } },
  { source: '成渝立交', target: '惠王陵', lineStyle: { color: '#85C73F' } },
  { source: '惠王陵', target: '洪河', lineStyle: { color: '#85C73F' } },
  { source: '洪河', target: '成都行政学院', lineStyle: { color: '#85C73F' } },
  { source: '成都行政学院', target: '大面铺', lineStyle: { color: '#85C73F' } },
  { source: '大面铺', target: '连山坡', lineStyle: { color: '#85C73F' } },
  { source: '连山坡', target: '界牌', lineStyle: { color: '#85C73F' } },
  { source: '界牌', target: '书房', lineStyle: { color: '#85C73F' } },
  { source: '书房', target: '龙平路', lineStyle: { color: '#85C73F' } },
  { source: '龙平路', target: '龙泉驿', lineStyle: { color: '#85C73F' } },
  { source: '太平园', target: '红牌楼', lineStyle: { color: '#FDD303' } },
  { source: '红牌楼', target: '高升桥', lineStyle: { color: '#FDD303' } },
  { source: '高升桥', target: '衣冠庙', lineStyle: { color: '#FDD303' } },
  { source: '衣冠庙', target: '省体育馆', lineStyle: { color: '#FDD303' } },
  { source: '省体育馆', target: '磨子桥', lineStyle: { color: '#FDD303' } },
  { source: '磨子桥', target: '新南门', lineStyle: { color: '#FDD303' } },
  { source: '新南门', target: '春熙路', lineStyle: { color: '#FDD303' } },
  { source: '春熙路', target: '市二医院', lineStyle: { color: '#FDD303' } },
  { source: '市二医院', target: '红星桥', lineStyle: { color: '#FDD303' } },
  { source: '红星桥', target: '前锋路', lineStyle: { color: '#FDD303' } },
  { source: '前锋路', target: '李家沱', lineStyle: { color: '#FDD303' } },
  { source: '李家沱', target: '驷马桥', lineStyle: { color: '#FDD303' } },
  { source: '驷马桥', target: '昭觉寺南路', lineStyle: { color: '#FDD303' } },
  { source: '昭觉寺南路', target: '动物园', lineStyle: { color: '#FDD303' } },
  { source: '动物园', target: '熊猫大道', lineStyle: { color: '#FDD303' } },
  { source: '熊猫大道', target: '军区总医院', lineStyle: { color: '#FDD303' } },
  { source: '马厂坝', target: '凤凰大街', lineStyle: { color: '#4E2C8D' } },
  { source: '凤凰大街', target: '涌泉', lineStyle: { color: '#4E2C8D' } },
  { source: '涌泉', target: '光华公园', lineStyle: { color: '#4E2C8D' } },
  { source: '光华公园', target: '南熏大道', lineStyle: { color: '#4E2C8D' } },
  { source: '南熏大道', target: '凤溪河', lineStyle: { color: '#4E2C8D' } },
  { source: '凤溪河', target: '杨柳河', lineStyle: { color: '#4E2C8D' } },
  { source: '杨柳河', target: '万盛', lineStyle: { color: '#4E2C8D' } },
  { source: '万盛', target: '非遗博览园', lineStyle: { color: '#4E2C8D' } },
  { source: '非遗博览园', target: '蔡桥', lineStyle: { color: '#4E2C8D' } },
  { source: '蔡桥', target: '中坝', lineStyle: { color: '#4E2C8D' } },
  { source: '中坝', target: '成都西站', lineStyle: { color: '#4E2C8D' } },
  { source: '成都西站', target: '清江西路', lineStyle: { color: '#4E2C8D' } },
  { source: '清江西路', target: '文化宫', lineStyle: { color: '#4E2C8D' } },
  { source: '文化宫', target: '西南财大', lineStyle: { color: '#4E2C8D' } },
  { source: '西南财大', target: '草堂北路', lineStyle: { color: '#4E2C8D' } },
  { source: '草堂北路', target: '中医大省医院', lineStyle: { color: '#4E2C8D' } },
  { source: '中医大省医院', target: '宽窄巷子', lineStyle: { color: '#4E2C8D' } },
  { source: '宽窄巷子', target: '骡马市', lineStyle: { color: '#4E2C8D' } },
  { source: '骡马市', target: '太升南路', lineStyle: { color: '#4E2C8D' } },
  { source: '太升南路', target: '市二医院', lineStyle: { color: '#4E2C8D' } },
  { source: '市二医院', target: '玉双路', lineStyle: { color: '#4E2C8D' } },
  { source: '玉双路', target: '双桥路', lineStyle: { color: '#4E2C8D' } },
  { source: '双桥路', target: '万年场', lineStyle: { color: '#4E2C8D' } },
  { source: '万年场', target: '槐树店', lineStyle: { color: '#4E2C8D' } },
  { source: '槐树店', target: '来龙', lineStyle: { color: '#4E2C8D' } },
  { source: '来龙', target: '十陵', lineStyle: { color: '#4E2C8D' } },
  { source: '十陵', target: '成都大学', lineStyle: { color: '#4E2C8D' } },
  { source: '成都大学', target: '明蜀王陵', lineStyle: { color: '#4E2C8D' } },
  { source: '明蜀王陵', target: '西河', lineStyle: { color: '#4E2C8D' } },
  { source: '太平园', target: '簇锦', lineStyle: { color: '#B8A8CF' } },
  { source: '簇锦', target: '华兴', lineStyle: { color: '#B8A8CF' } },
  { source: '华兴', target: '金花', lineStyle: { color: '#B8A8CF' } },
  { source: '金花', target: '双流机场1航站楼', lineStyle: { color: '#B8A8CF' } },
  { source: '双流机场1航站楼', target: '双流机场2航站楼', lineStyle: { color: '#B8A8CF' } },
  { source: '高朋大道', target: '神仙树', lineStyle: { color: '#F26F1F' } },
  { source: '神仙树', target: '火车南站', lineStyle: { color: '#F26F1F' } },
  { source: '火车南站', target: '三瓦窑', lineStyle: { color: '#F26F1F' } },
  { source: '三瓦窑', target: '琉璃场', lineStyle: { color: '#F26F1F' } },
  { source: '琉璃场', target: '四川师大', lineStyle: { color: '#F26F1F' } },
  { source: '四川师大', target: '狮子山', lineStyle: { color: '#F26F1F' } },
  { source: '狮子山', target: '大观', lineStyle: { color: '#F26F1F' } },
  { source: '大观', target: '成都东客站', lineStyle: { color: '#F26F1F' } },
  { source: '成都东客站', target: '迎晖路', lineStyle: { color: '#F26F1F' } },
  { source: '迎晖路', target: '槐树店', lineStyle: { color: '#F26F1F' } },
  { source: '槐树店', target: '双店路', lineStyle: { color: '#F26F1F' } },
  { source: '双店路', target: '崔家店', lineStyle: { color: '#F26F1F' } },
  { source: '崔家店', target: '理工大学', lineStyle: { color: '#F26F1F' } },
  { source: '理工大学', target: '二仙桥', lineStyle: { color: '#F26F1F' } },
  { source: '二仙桥', target: '八里庄', lineStyle: { color: '#F26F1F' } },
  { source: '八里庄', target: '府青路', lineStyle: { color: '#F26F1F' } },
  { source: '府青路', target: '驷马桥', lineStyle: { color: '#F26F1F' } },
  { source: '驷马桥', target: '火车北站', lineStyle: { color: '#F26F1F' } },
  { source: '火车北站', target: '北站西二路', lineStyle: { color: '#F26F1F' } },
  { source: '北站西二路', target: '九里堤', lineStyle: { color: '#F26F1F' } },
  { source: '九里堤', target: '西南交大', lineStyle: { color: '#F26F1F' } },
  { source: '西南交大', target: '花照壁', lineStyle: { color: '#F26F1F' } },
  { source: '花照壁', target: '茶店子', lineStyle: { color: '#F26F1F' } },
  { source: '茶店子', target: '一品天下', lineStyle: { color: '#F26F1F' } },
  { source: '一品天下', target: '金沙博物馆', lineStyle: { color: '#F26F1F' } },
  { source: '金沙博物馆', target: '文化宫', lineStyle: { color: '#F26F1F' } },
  { source: '文化宫', target: '东坡路', lineStyle: { color: '#F26F1F' } },
  { source: '东坡路', target: '龙爪堰', lineStyle: { color: '#F26F1F' } },
  { source: '龙爪堰', target: '武侯大道', lineStyle: { color: '#F26F1F' } },
  { source: '武侯大道', target: '太平园', lineStyle: { color: '#F26F1F' } },
];

var lineNames = [];

for (var index = 0; index < stations.length - 1; index++) {
  if (lineNames.indexOf(stations[index].category) == -1) {
    lineNames.push(stations[index].category);
  }
}

var legend = [
  {
    data: lineNames,
  },
];

var categories = lineNames.map((lineName) => {
  return {
    name: lineName,
  };
});

// @ts-ignore
export const option = {
  title: {
    // text: '成都地铁示意图',
  },
  color: [
    '#EE1822',
    '#85C73F',
    '#FDD303',
    '#4E2C8D',
    '#8F57A2',
    '#D7156B',
    '#F26F1F',
    '#009DD7',
    '#67CCF6',
    '#B8A8CF',
    '#7C1F31',
    '#54ae11',
    '#E77DAD',
    '#78d6cd',
    '#bc796f',
  ],
  tooltip: {},
  legend: legend,
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 6,
      focusNodeAdjacency: true,
      roam: true,
      label: {
        show: true,
        rotate: '30',
        color: 'black',
        position: 'right',
      },
      edgeSymbol: ['none', 'none'],
      edgeSymbolSize: [4, 6],
      edgeLabel: {
        normal: {
          textStyle: {
            fontSize: 20,
          },
        },
      },
      data: stations,
      zoom: 3,
      top: 250,
      links: links,
      categories: categories,
      lineStyle: {
        normal: {
          opacity: 0.9,
          width: 6,
          curveness: 0,
        },
      },
    },
  ],
};