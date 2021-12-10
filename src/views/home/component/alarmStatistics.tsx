import { Modal, Spin, Table } from "antd";
import { useDebounce } from "hook/useDebounce";
import { useHomeContext } from "..";
import { useState, useEffect } from "react";
import bg from "assets/home/home-left2-icon.png";
import * as echarts from "echarts";
import {
  useAlarmModal,
  useAlarmPagination,
  useAlarmStatistics,
} from "api/home/alarm-statistics";

const DemoPie = () => {
  const { data: alarmStatistics } = useAlarmStatistics();
  const { open } = useAlarmModal();
  const color = [
    "#35AAF6",
    "#05AEA5",
    "#F6B54B",
    "#EF702E",
    "#87E9FF",
    "#00AEA5",
    "#F6B34B",
    "#EF072E",
    "#79E9FF",
    "#35AEA5",
  ];
  const seriesOption = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      radius: [101, 103],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "outside",
            color: "#ddd",
            formatter: function (params: any) {
              return params.name + "：" + params.value;
            },
          },
          labelLine: {
            length: 5,
            length2: 5,
            show: true,
            color: "#00ffff",
          },
        },
      },
      data: alarmStatistics?.data,
    },
  ];
  const option = {
    color: color,
    graphic: {
      elements: [
        {
          type: "image",
          z: 3,
          style: {
            image: bg,
            width: 140,
            height: 140,
          },
          left: "center",
          top: "center",
          position: [100, 100],
        },
      ],
    },
    tooltip: {
      show: true,
    },
    toolbox: {
      show: false,
    },
    series: seriesOption,
  };

  useEffect(() => {
    const myEcharts = echarts.init(
      document.getElementById("task") as HTMLElement
    );
    myEcharts.setOption(option);
    myEcharts.on("click", (params: any) => {
      open(params.data.type);
    });

    window.addEventListener("resize", () => {
      if (myEcharts != null) {
        myEcharts.resize();
      }
    });
  }, [alarmStatistics, option]);

  return (
    <>
      <div id="task" style={{ height: "100%", width: "100%" }}></div>
      <OpenModal />
    </>
  );
};

export default DemoPie;

const OpenModal = () => {
  const { alarmId } = useHomeContext();
  const { ModalOpen, close } = useAlarmModal();
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: "",
  });

  const { data: Alarm, isLoading } = useAlarmPagination(
    useDebounce({ ...param, type: alarmId }, 500)
  );

  const columns = [
    {
      title: "作业名称",
      dataIndex: "workName",
    },
    {
      title: "工具名称",
      dataIndex: "toolName",
    },
    {
      title: "小组名称",
      dataIndex: "groupName",
    },
    {
      title: "创建时间",
      dataIndex: "warnTime",
    },
    {
      title: "解除时间",
      dataIndex: "relieveTime",
    },
    {
      title: "设备编号",
      dataIndex: "groupId",
    },
    {
      title: "绑定人",
      dataIndex: "createBy",
    },
    {
      title: "告警时间",
      dataIndex: "createTime",
    },
    {
      title: "告警内容",
      dataIndex: "content",
    },
  ];

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <Modal
      forceRender={true}
      visible={ModalOpen}
      onCancel={close}
      title={"告警统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Alarm?.data}
        pagination={{
          total: Alarm?.count,
          current: param.index,
          pageSize: param.size,
        }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item) => item.key}
      />
    </Modal>
  );
};
