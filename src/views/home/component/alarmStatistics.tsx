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
import { getType } from "views/alarm";

const DemoPie = ({ show }: { show: boolean }) => {
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
      data: alarmStatistics,
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
    myEcharts.resize();
    myEcharts.setOption(option);
    myEcharts.on("click", (params: any) => {
      open(params.data.type);
    });
  }, [alarmStatistics, option, show]);

  return (
    <>
      <div id="task" style={{ height: "100%", width: "100%" }}></div>
      <OpenModal />
    </>
  );
};

export default DemoPie;

const OpenModal = () => {
  const workName = {
    title: "作业名称",
    dataIndex: "workName",
    key: "workName",
    ellipsis: true,
    className: "hb",
  };

  const type = {
    title: "告警类型",
    key: "type",
    render: (item: any) => <>{getType(item.type)?.name}</>,
    ellipsis: true,
    className: "hb",
  };

  const toolName = {
    title: "工具名称",
    dataIndex: "toolName",
    key: "toolName",
    ellipsis: true,
    className: "hb",
  };

  const groupName = {
    title: "小组名称",
    dataIndex: "groupName",
    key: "groupName",
    ellipsis: true,
    className: "hb",
  };

  const relieveTime = {
    title: "解除时间",
    dataIndex: "relieveTime",
    key: "relieveTime",
    ellipsis: true,
    className: "hb",
  };

  const labelNum = {
    title: "设备标签",
    dataIndex: "labelNum",
    key: "labelNum",
    ellipsis: true,
    className: "hb",
  };

  const personName = {
    title: "人员",
    dataIndex: "personName",
    key: "personName",
    ellipsis: true,
    className: "hb",
  };

  const warnTime = {
    title: "告警时间",
    dataIndex: "warnTime",
    key: "warnTime",
    ellipsis: true,
    className: "hb",
  };

  const content = {
    title: "告警内容",
    dataIndex: "content",
    key: "content",
    ellipsis: true,
    className: "hb",
  };

  const { alarmId } = useHomeContext();
  const { ModalOpen, close } = useAlarmModal();
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: "",
  });

  const [alarmType, setAlarmType] = useState<any>([]);

  const { data: Alarm, isLoading } = useAlarmPagination(
    useDebounce({ ...param, type: alarmId }, 500)
  );

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  useEffect(() => {
    console.log(alarmId);

    switch (alarmId) {
      case 2:
        setAlarmType([workName, type, groupName, warnTime, content]);
        break;

      case 3:
        setAlarmType([workName, type, groupName, warnTime, content]);
        break;

      case 4:
        setAlarmType([workName, type, groupName, warnTime, content]);
        break;

      case 5:
        setAlarmType([workName, type, personName, warnTime, content]);
        break;

      case 6:
        setAlarmType([workName, type, personName, warnTime, content]);
        break;

      case 7:
        setAlarmType([
          workName,
          type,
          toolName,
          groupName,
          relieveTime,
          labelNum,
          warnTime,
          content,
        ]);
        break;

      case 8:
        setAlarmType([content, warnTime, type]);
        break;

      case 10:
        setAlarmType([content, warnTime, type]);
        break;

      case 11:
        setAlarmType([workName, type, warnTime, content]);
        break;

      case 12:
        setAlarmType([workName, type, groupName, warnTime, content]);
        break;

      default:
        break;
    }
  }, [alarmId]);

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
        columns={alarmType}
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
