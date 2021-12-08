import { Button, Form, Input, Table, Space, DatePicker } from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useDebounce } from "hook/useDebounce";
import { useInit } from "./request";
import { useState } from "react";
import { noData } from "utils/verification";
import { Header, Main, SearchForm } from "components/Styled";
const { RangePicker } = DatePicker;

export const Log = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    operName: "",
    startTime: "",
    endTime: "",
  });

  const { data, isLoading } = useInit(useDebounce(param, 500));

  const search = (values: any) => {
    setParam({ ...param, operName: values.name, index: 1 });
  };

  const timeChange = (dates: any, dateStrings: any) => {
    setParam({
      ...param,
      index: 1,
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  const columns = [
    {
      title: "操作者",
      dataIndex: "operName",
      key: "operName",
      className: "hb",
    },
    {
      title: "操作时间",
      dataIndex: "operTime",
      key: "id",
      className: "hb",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      className: "hb",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      className: "hb",
    },
  ];

  return (
    <>
      <Header>
      <div className="left"></div>
          <div className="right">日志管理</div>
        
      </Header>
      <Main>
        <SearchForm>
        <Form name="basic" onFinish={search} layout={"inline"}>
          <Form.Item label="" name="name">
            <Input
              placeholder={"操作者"}
              value={param.operName}
              onChange={(evt) =>
                setParam({ ...param, operName: evt.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="" name="time">
            <Space direction="vertical" size={50}>
              <RangePicker
                style={{ width: "100%" }}
                locale={locale}
                onChange={timeChange}
              />
            </Space>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        </SearchForm>
        <Table
          columns={columns}
          pagination={{
            total: data?.count,
            current: param.index,
            pageSize: param.size,
            hideOnSinglePage: true
          }}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={data?.data}
          rowKey={(item) => item.id}
          locale={noData}
          size="small"
        />
      </Main>
    </>
  );
};
