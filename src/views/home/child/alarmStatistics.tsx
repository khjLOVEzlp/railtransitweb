import { Pie, measureTextWidth } from "@ant-design/charts";
import { Modal, Spin, Table } from "antd";
import {
  useAlarmStatistics,
  useAlarmPagination,
  useAlarmModal,
} from "../request";
import { useDebounce } from "hook/useDebounce";
import { noData } from "utils/verification";
import { useHomeContext } from "..";
import { useState } from "react";
import bg from "assets/home/home-left2-icon.png";

const DemoPie = () => {
  const { data: alarmStatistics, isLoading } = useAlarmStatistics()
  const { open } = useAlarmModal()
  
  const config = {
    // appendPadding: 10,
    data: alarmStatistics?.data,
    // legend: false,
    legend: {
      layout: "vertical",
      position: "right",
      itemName: {
        style: {
          fill: "#fff",
        },
      },
    },
    theme: {
      styleSheet: {
        backgroundColor: "#00225C",
      },
      colors10: [
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
      ],
    },
    radius: 0.7,
    innerRadius: 0.8,
    angleField: "num",
    colorField: "name",
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: false,
    },
    annotations: [
      {
        type: "image",
        src: bg,

        /** 位置 */
        position: ["50%", "50%"],

        /** 图形样式属性 */
        style: {
          width: 70,
          height: 70,
        },

        /** x 方向的偏移量 */
        offsetX: -35,

        /** y 方向的偏移量 */
        offsetY: 40,
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        // @ts-ignore
        <Pie
          {...config}
          onReady={(plot: any) => {
            plot.on("plot:click", (evt: any) => {
              const { x, y } = evt;
              const tooltipData = plot.chart.getTooltipItems({ x, y });
              open(tooltipData[0].data.type);
            });
          }}
        />
      )}

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
        locale={noData}
      />
    </Modal>
  );
};
