import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Modal, Table } from "antd";
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
      radius: [101, 103],
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
    legend: [
      {
        right: 5,
        bottom: "center",
        icon: "circle",
        textStyle: {
          color: "#fff",
          fontSize: "10px",
          width: "10px",
        },
        itemGap: 12,
        itemWidth: 10,
        itemHeight: 10,
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
