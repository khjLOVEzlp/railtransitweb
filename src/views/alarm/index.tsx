import styled from "@emotion/styled";
import { Select, Table } from "antd";
import { useState } from "react";
import { useDocumentTitle } from "hook/useDocumentTitle";
import { useInit, useWarnCount } from "./request";
import { noData } from "utils/verification";
import didian from "assets/alert/低电告警.png";
import fenli from "assets/alert/分离告警.png";
import jiujing from "assets/alert/酒精.png";
import lixian from "assets/alert/离线告警.png";
import loudai from "assets/alert/漏带.png";
import loudian from "assets/alert/漏点.png";
import xueya from "assets/alert/血压.png";
import yiliu from "assets/alert/遗留.png";
import yilou from "assets/alert/遗漏.png";
import yiqing from "assets/alert/疫情.png";
const { Option } = Select;

export const getType = (type: number) => {
  switch (type) {
    case 1:
      return {
        name: "遗忘",
        img: "",
      };
    case 2:
      return {
        name: "漏带",
        img: loudai,
      };

    case 3:
      return {
        name: "漏点",
        img: loudian,
      };

    case 4:
      return {
        name: "遗漏",
        img: yilou,
      };

    case 5:
      return {
        name: "疫情",
        img: yiqing,
      };

    case 6:
      return {
        name: "酒精",
        img: jiujing,
      };

    case 7:
      return {
        name: "分离告警",
        img: fenli,
      };

    case 8:
      return {
        name: "离线告警",
        img: lixian,
      };

    case 10:
      return {
        name: "低电告警",
        img: didian,
      };

    case 11:
      return {
        name: "血压",
        img: xueya,
      };

    case 12:
      return {
        name: "遗留",
        img: yiliu,
      };

    default:
      break;
  }
};

const stateList = [
  {
    name: "查所有",
    value: "0",
  },
  /*{
    name: "防遗忘",
    value: "1"
  },*/
  {
    name: "漏带",
    value: "2",
  },
  {
    name: "漏点",
    value: "3",
  },
  {
    name: "遗漏",
    value: "4",
  },
  {
    name: "疫情",
    value: "5",
  },
  {
    name: "酒精",
    value: "6",
  },
  {
    name: "分离告警",
    value: "7",
  },
  {
    name: "离线告警",
    value: "8",
  },

  {
    name: "低电告警",
    value: "10",
  },
  {
    name: "血压",
    value: "11",
  },
  {
    name: "遗留",
    value: "12",
  },
];

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

export const Alarm = () => {
  useDocumentTitle("告警上报");

  const [pagination, setPagination] = useState({
    index: 1,
    size: 10,
    state: "0",
    time: "1",
  });

  const [alarmType, setAlarmType] = useState<any>([
    workName,
    type,
    toolName,
    groupName,
    relieveTime,
    labelNum,
    personName,
    warnTime,
    content,
  ]);

  const [time, setTime] = useState("1");

  const { data: navList } = useWarnCount(time);
  const { data: dataList, isLoading } = useInit({ ...pagination });

  const navChange = (value: string) => {
    setTime(value);
  };

  const timeChange = (value: string) => {
    setPagination({ ...pagination, time: value });
  };

  const handleTableChange = (p: any) => {
    setPagination({ ...pagination, index: p.current, size: p.pageSize });
  };

  const timeList = [
    {
      name: "一周",
      value: "1",
    },
    {
      name: "半月",
      value: "2",
    },
    {
      name: "一个月",
      value: "3",
    },
    {
      name: "三个月",
      value: "4",
    },
    {
      name: "半年",
      value: "5",
    },
    {
      name: "一年",
      value: "6",
    },
  ];

  const stateChange = (value: string) => {
    setPagination({ ...pagination, state: value });
    if (value === "0") {
      setAlarmType([
        workName,
        type,
        toolName,
        groupName,
        relieveTime,
        labelNum,
        personName,
        warnTime,
        content,
      ]);
    }
    if (value === "2") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (value === "3") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (value === "4") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (value === "5") {
      setAlarmType([workName, type, personName, warnTime, content]);
    }
    if (value === "6") {
      setAlarmType([workName, type, personName, warnTime, content]);
    }
    if (value === "7") {
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
    }
    if (value === "8") {
      setAlarmType([content, warnTime, type]);
    }

    if (value === "11") {
      setAlarmType([workName, type, warnTime, content]);
    }
    if (value === "12") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
  };

  const navClick = async (value: string) => {
    await setPagination({ ...pagination, index: 1, state: value, time });

    if (String(value) === "0") {
      setAlarmType([
        workName,
        type,
        toolName,
        groupName,
        relieveTime,
        labelNum,
        personName,
        warnTime,
        content,
      ]);
    }
    if (String(value) === "2") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (String(value) === "3") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (String(value) === "4") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
    if (String(value) === "5") {
      setAlarmType([workName, type, personName, warnTime, content]);
    }
    if (String(value) === "6") {
      setAlarmType([workName, type, personName, warnTime, content]);
    }
    if (String(value) === "7") {
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
    }
    if (String(value) === "8") {
      setAlarmType([content, warnTime, type]);
    }
    if (String(value) === "11") {
      setAlarmType([workName, type, warnTime, content]);
    }
    if (String(value) === "12") {
      setAlarmType([workName, type, groupName, warnTime, content]);
    }
  };

  return (
    <AlarmStyle>
      <Header>
        <Select
          style={{ width: 120, margin: "1rem 0" }}
          defaultValue={"1"}
          onChange={navChange}
        >
          {timeList.map((item: any, index: number) => (
            <Option key={index} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Nav>
          {navList?.data.map((item: any, index: number) => (
            <li key={index} onClick={() => navClick(item.type)}>
              {/* <img src={`../../assets/alert/${getType(item.type)}.png`} alt="" /> */}
              <img src={`${getType(item.type)?.img}`} alt="" />
              <div style={{ fontSize: "1.6rem" }}>
                {getType(item.type)?.name}
              </div>
              <div style={{ fontSize: "4rem", color: "#333" }}>{item.num}</div>
            </li>
          ))}
        </Nav>
      </Header>
      <Main>
        <Select
          style={{ width: 120, margin: "1rem 0" }}
          defaultValue={"0"}
          onChange={stateChange}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        >
          {stateList.map((item: any, index: number) => (
            <Option key={index} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          style={{ width: 120, margin: "1rem 0", marginLeft: "1rem" }}
          defaultValue={"1"}
          onChange={timeChange}
        >
          {timeList.map((item: any, index: number) => (
            <Option key={index} value={item.value}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Table
          columns={alarmType}
          pagination={{
            total: dataList?.count,
            current: pagination.index,
            pageSize: pagination.size,
            hideOnSinglePage: true,
          }}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={dataList?.data}
          rowKey={(item) => item.id}
          locale={noData}
          size="small"
        />
      </Main>
    </AlarmStyle>
  );
};

const AlarmStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px;
`;

const Header = styled.div`
  // background: #fff;
  border-radius: 1rem;
`;

const Main = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 1rem;
  padding: 0 2rem;
  overflow-y: auto;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  color: #989eac;
  flex-wrap: wrap;

  > li {
    width: 19%;
    margin-left: 0.1%;
    height: 120px;
    background: #fff;
    // box-shadow: 0px 0px 8px 0px rgba(87, 87, 87, 0.15);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
  }
`;
