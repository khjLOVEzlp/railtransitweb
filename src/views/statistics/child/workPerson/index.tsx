import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import { Column } from "@ant-design/charts";
import {
  useWorkStatistics,
  useWorkModal,
  useWorkStatisticsDetail,
} from "./request";
import { useEffect, useState } from "react";
import { Header, SearchForm } from "components/Styled";
import { useDebounce } from "hook/useDebounce";
import styled from "@emotion/styled";

export const WorkPerson = () => {
  const [form] = Form.useForm();
  const { data: lineList, isSuccess: success } = useLineList();
  const [params, setParams] = useState({
    time: "",
    subwayId: "",
  });

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      setParams({ time: "3", subwayId: lineList.data[0].id });
    }
  }, [lineList?.data, success]);

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id });
    }
  }, [success, form, lineList?.data]);

  const { open } = useWorkModal();

  const { data: workStatistics, isSuccess } = useWorkStatistics(params);

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value });
  };

  const timeChange = (value: any) => {
    setParams({ ...params, time: value });
  };

  const noData = [
    {
      className: "到岗班别",
      classId: 0,
    },
  ];

  const data =
    isSuccess && workStatistics?.data.length > 0
      ? workStatistics?.data
      : noData;

  const config = {
    data,
    xField: "className",
    yField: "dutyRate",
    padding: 30,
    maxColumnWidth: 100,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      className: { alias: "班别" },
      dutyRate: { alias: "到岗率" },
    },
    tooltip: {
      formatter: function formatter(item: any) {
        return {
          name: "到岗率",
          value: item.dutyRate ? item.dutyRate + "%" : "0%",
        };
      },
    },
  };

  return (
    <>
      <Header>
        <div className="left"></div>
        <div className="right">到岗统计</div>
      </Header>

      <Main>
        <SearchForm>
          <Form layout={"inline"} form={form}>
            <Form.Item name={"subwayId"}>
              <Select
                style={{ width: 120 }}
                placeholder={"地铁路线"}
                showSearch
                onChange={lineChange}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {lineList?.data.map((item: any) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name={"time"} initialValue={"3"}>
              <Select
                placeholder={"时间"}
                style={{ width: 120 }}
                onChange={timeChange}
              >
                <Select.Option value={"1"}>本日</Select.Option>
                <Select.Option value={"2"}>本周</Select.Option>
                <Select.Option value={"3"}>本月</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </SearchForm>
        {/*@ts-ignore*/}
        <Column
          {...config}
          onReady={(plot: any) => {
            plot.on("plot:click", (evt: any) => {
              open(params.subwayId, params.time);
            });
          }}
        />
        <WorkPersonModal params={params} />
      </Main>
    </>
  );
};

export const WorkPersonModal = ({
  params,
}: {
  params: { subwayId: string; time: string };
}) => {
  const { ModalOpen, close } = useWorkModal();
  const [param, setParam] = useState({
    subwayId: "",
    time: "",
  });

  useEffect(() => {
    setParam({
      ...param,
      subwayId: params.subwayId,
      time: params.time,
    });
  }, [params]);

  const { data: alarmDetail, isLoading } = useWorkStatisticsDetail(
    useDebounce(param, 500)
  );

  const columns = [
    {
      title: "部门",
      dataIndex: "className",
    },
    {
      title: "姓名",
      dataIndex: "personName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
  ];

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"未到岗统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={alarmDetail?.data}
        // pagination={{ total: alarmDetail?.count, current: param.index, pageSize: param.size }}
        pagination={false}
        loading={isLoading}
        // onChange={handleTableChange}
        rowKey={(item) => item.key}
      />
    </Modal>
  );
};

const Main = styled.div`
  flex: 8;
  background: #fff;
  border-radius: 1rem;
  padding: 0 1rem;
  overflow-y: auto;
  height: 100%;
  box-shadow: 0px 0px 8px 0px rgba(87, 87, 87, 0.15);
  display: flex;
  justify-ontent: space-between;
  flex-direction: column;
`;