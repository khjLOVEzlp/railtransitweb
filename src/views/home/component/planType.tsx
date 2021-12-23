import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Modal, Spin, Table } from "antd";
import { useDebounce } from "hook/useDebounce";
import { noData } from "utils/verification";
import { type } from "utils";
import {
  usePlanModal,
  usePlanPagination,
  usePlanStatistics,
} from "api/home/plan-statistics";
import { FullPageLoading } from "components/FullPageLoading";

const PlanType = ({ show }: { show: boolean }) => {
  const { isLoading, data: planStatistics } = usePlanStatistics();
  const { open } = usePlanModal();
  const img =
    "data:image/png;base64,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";

  const data = [];
  const color = [
    "#33E598",
    "#FF585D",
    "#62C4E9",
    "#FFD876",
    "#9E5AFA",
    "#5A7FFA",
  ];
  for (var i = 0; i < planStatistics?.data.length; i++) {
    data.push(
      {
        value: planStatistics?.data[i].num,
        name: planStatistics?.data[i].name,
        itemStyle: {
          normal: {
            borderWidth: 8,
            shadowBlur: 20,

            borderRadius: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      {
        value: 8,
        name: "",
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0,
          },
        },
      }
    );
  }
  var seriesOption = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      radius: [95, 95],
      // width: 280,
      // height: 252,
      hoverAnimation: false,
      center: ["50%", "55%"],
      top: "center",
      left: "-20",
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
        },
      },
      data: data,
    },
  ];

  const option = {
    color: color,
    tooltip: {
      show: true,
    },
    // graphic: {
    //   elements: [
    //     {
    //       type: "image",
    //       z: 1,
    //       style: {
    //         image: img,
    //         width: 150,
    //         height: 150,
    //       },
    //       left: "35%",
    //       top: "center",
    //     },
    //   ],
    // },
    legend: [
      {
        right: 15,
        bottom: "center",
        textStyle: {
          color: "#fff",
          fontSize: "10px",
        },
        itemGap: 10,
      },
    ],
    series: seriesOption,
  };

  useEffect(() => {
    const myEcharts = echarts.init(
      document.getElementById("plan_type") as HTMLElement
    );
    myEcharts.resize();
    myEcharts.setOption(option);
    myEcharts.on("click", (params: any) => {
      // @ts-ignore
      open(type(params.name));
    });
  }, [option, show]);

  return (
    <>
      {isLoading && <FullPageLoading />}
      <div id="plan_type" style={{ height: "100%", width: "100%" }}></div>

      <OpenModal />
    </>
  );
};

const OpenModal = () => {
  const { ModalOpen, close, planId } = usePlanModal();
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: "",
  });

  const { data: Plan, isLoading } = usePlanPagination(
    useDebounce({ ...param, type: planId }, 500)
  );
  const columns = [
    {
      title: "计划名称",
      dataIndex: "name",
    },
    {
      title: "地铁线路",
      dataIndex: "lineName",
    },
    {
      title: "请站点",
      dataIndex: "pleaseName",
    },
    {
      title: "销站点",
      dataIndex: "pinName",
    },

    {
      title: "开始时间",
      dataIndex: "beginTime",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
    },
  ];

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <Modal
      forceRender={true}
      footer={false}
      visible={ModalOpen}
      onCancel={close}
      title={"计划统计"}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Plan?.data}
        pagination={{
          total: Plan?.count,
          current: param.index,
          pageSize: param.size,
        }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item) => item.key}
        locale={noData}
      />
    </Modal>
  );
};

export default PlanType;
