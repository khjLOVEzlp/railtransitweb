import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useLine, useSubwayList } from "views/system/child/line/request";
import { subwaylist, guangzhouLine } from "./index";
import { useHttp } from "utils/http";
import { FullPageLoading } from "components/FullPageLoading";

export const Subway = () => {
  const { data: lineList, isSuccess, isLoading } = useLine();
  // const { data: subwayList, isSuccess:success } = useSubwayList()

  const client = useHttp();
  if (isSuccess) {
    // @ts-ignore
    let newData: any = subwaylist.filter((v) =>
      lineList.data.find((vi: { [key: string]: unknown }) => vi.name === v.name)
    );
    console.log(newData);

    newData.forEach((item: any, index: number) => {
      if (lineList.data.find((v: any) => v.name === item.name)) {
        item.stations.forEach((key: any, i: number) => {
          if (
            lineList.data[index]["platformList"].find(
              (vi: any) => vi.name === key["name"]
            )
          ) {
            key["subwayId"] = lineList.data[index]["platformList"].find(
              (vi: any) => vi.name === key["name"]
            ).id;
          }
        });
      }
    });

    newData.forEach((item: any, index: number) => {
      item.tooltip.formatter = `{b}
      <br />人数：${lineList?.data[index].personCount || "0"}
      <br />班别数：${lineList?.data[index].classCount || "0"}
      <br />仓库数：${lineList?.data[index].warehouseCount || "0"}
      <br />站台数：${lineList?.data[index].platformCount || "0"}
      <br />`;
      item.tooltip.alwaysShowContent = true;
    });

    var newlist: any = [];

    newData.forEach((v: { [key: string]: [] }) => {
      newlist = [
        ...newlist,
        {
          name: v.name,
          tooltip: v.tooltip,
          symbolSize: v.symbolSize,
          value: v.value,
          fixed: v.fixed,
          category: v.category,
          label: v.label,
          itemStyle: v.itemStyle,
        },
        ...v.stations,
      ];
    });

    var obj: any = {};

    var str = newlist.reduce((cur: any, next: any) => {
      if (obj[next.name]) {
        cur.map((item: any) => {
          if (item.name === next.name) {
            return (item.isFlag = true);
          }
        });
      } else {
        obj[next.name] = true && cur.push(next);
      }
      return cur;
    }, []);
  }

  const option = {
    title: {
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
          fontSize: 20,
        },
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 20,
        end: 100,
        textStyle: {
          fontSize: 16,
        },
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
        links: guangzhouLine,
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

  let myEcharts: any;

  if (myEcharts != null && myEcharts != "" && myEcharts != undefined) {
    // @ts-ignore
    myEcharts.dispose();
  }

  useEffect(() => {
    myEcharts = echarts.init(document.getElementById("subway") as HTMLElement);
    myEcharts.setOption(option);

    myEcharts.on("mouseover", (params: any) => {
      if (params.data.subwayId) {
        client(`linePlatform/getInfo/${params.data.subwayId}`).then(
          async (res) => {
            const data = await res.data;
            params.data.tooltip.formatter = `{b}<br />班别：${
              data[0]?.departmentName || "无"
            }<br />区间：${data[0]?.roadName || "无"}<br />材料数量：${
              data[0]?.count || "0"
            }`;
          }
        );
      } else if (params.data.tooltip) {
        params.data.tooltip.formatter = `{b}<br />班别：无<br />区间：无<br />材料数量：0`;
      } else {
        return false;
      }
    });

    window.addEventListener("resize", () => {
      if (myEcharts != null) {
        myEcharts.resize();
      }
    });
    // @ts-ignore
    if (refs.current?.offsetWidth) {
      myEcharts.resize();
    }
    // @ts-ignore
  }, [refs.current?.offsetWidth, option]);

  return (
    <>
      {isLoading && <FullPageLoading />}

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
  );
};
