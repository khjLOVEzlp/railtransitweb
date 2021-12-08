import { Form, Input, Button, Table, Tag } from "antd";
import { ModalForm } from "./modal/ModalForm";
import { useInit } from "./request";
import { useDebounce } from "hook/useDebounce";
import { useHistoryModal } from "./util";
import { Header, Main, SearchForm } from "components/Styled";
import { useParam } from "hook/useParam";

export const WorkManage = () => {
  const { param, setParam } = useParam();

  const { startEdit } = useHistoryModal();
  const { data, isLoading } = useInit(useDebounce(param, 500));

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 });
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  /*是否自动执行*/
  const isWarn = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color="error">否</Tag>;
      case 1:
        return <Tag color="success">是</Tag>;

      default:
        break;
    }
  };

  return (
    <>
      <Header>
        <div className="left"></div>
        <div className="right">作业历史</div>
      </Header>
      <Main>
        <SearchForm>
          <Form name="basic" onFinish={search} layout={"inline"}>
            <Form.Item label="" name="name">
              <Input
                placeholder={"作业名称"}
                value={param.name}
                onChange={(evt) =>
                  setParam({ ...param, name: evt.target.value, index: 1 })
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </SearchForm>
        <Table
          columns={[
            {
              title: "作业名称",
              dataIndex: "name",
              key: "name",
              className: "hb",
            },
            {
              title: "计划执行时间",
              dataIndex: "beginTime",
              key: "beginTime",
              className: "hb",
            },
            {
              title: "负责人",
              dataIndex: "leaderName",
              key: "leaderName",
              className: "hb",
            },
            {
              title: "是否自动提醒",
              key: "isWarn",
              render: (item) => <span>{isWarn(item.isWarn)}</span>,
              className: "hb",
            },
            {
              title: "备注",
              dataIndex: "remark",
              key: "remark",
              className: "hb",
            },
            {
              title: "操作",
              key: "id",
              align: "center",
              className: "hb",
              render: (item) => (
                <>
                  <Button type={"link"} onClick={() => startEdit(item.id)}>
                    查看
                  </Button>
                </>
              ),
            },
          ]}
          pagination={{
            total: data?.count,
            current: param.index,
            pageSize: param.size,
            hideOnSinglePage: true
          }}
          onChange={handleTableChange}
          dataSource={data?.data}
          loading={isLoading}
          rowKey={(item) => item.id}
          size="small"
        />
      </Main>
      <ModalForm />
    </>
  );
};
