import { Form, Input, Button, Table, Popconfirm, message, Modal } from "antd";
import { ModalForm } from "./component/ModalForm";
import { useDebounce } from "hook/useDebounce";
import { usePlanTypeModal } from "./util";
import { Search } from "utils/typings";
import { useState } from "react";
import { noData } from "utils/verification";
import { Footer, Header, Main, SearchForm } from "components/Styled";
import { useAuth } from "context/auth-context";
import { isButton } from "utils";
import { useDel, useInit } from "api/work-plan/work-type";

export const PlanType = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: "",
  });

  const { menu } = useAuth();
  const menuList = menu
    .find((item: { [item: string]: unknown }) => item.name === "作业计划")
    .childMenu.find(
      (item: { [item: string]: unknown }) => item.name === "作业类型"
    ).childMenu;

  const { open, startEdit } = usePlanTypeModal();
  const { data, isLoading } = useInit(useDebounce(param, 500));
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel();

  const confirm = (id: number) => {
    Del(id).then((res) => {
      if (res.code !== 200) {
        message.error(res.msg);
      } else {
        message.success("删除成功");
        setParam({ ...param, index: 1 });
        setSelectedRowKeys([]);
      }
    });
  };

  const cancel = () => {
    message.error("取消删除");
  };

  const search = (item: Search) => {
    setParam({ ...param, type: item.type, index: 1 });
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.state == 1,
    }),
  };

  const start = () => {
    const ids = selectedRowKeys.join(",");
    Modal.confirm({
      title: `是否要删除${selectedRowKeys.length}条数据`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(ids);
        setSelectedRowKeys([]);
      },
    });
  };

  return (
    <>
      <Header>
        <div className="left"></div>
        <div className="right">作业类型</div>
      </Header>
      <Main>
        <SearchForm>
          <Form name="basic" onFinish={search} layout={"inline"}>
            <Form.Item label="" name="type">
              <Input
                placeholder={"作业类型"}
                value={param.type}
                onChange={(evt) =>
                  setParam({ ...param, type: evt.target.value })
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          {isButton(menuList, "新增") && <Button onClick={open}>新增</Button>}
        </SearchForm>
        <Table
          columns={[
            {
              title: "作业类型",
              dataIndex: "type",
              key: "type",
              className: "hb",
            },
            {
              title: "时间",
              dataIndex: "createTime",
              key: "createTime",
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
                  {isButton(menuList, "修改") && (
                    <Button type="link" onClick={() => startEdit(item.id)}>
                      修改
                    </Button>
                  )}
                  <Popconfirm
                    title={`是否要删除${item.type}`}
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText="是"
                    cancelText="否"
                  >
                    {isButton(menuList, "删除") && (
                      <Button type={"link"} danger>删除</Button>
                    )}
                  </Popconfirm>
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
          locale={noData}
          rowSelection={rowSelection}
          size="small"
        />
      </Main>
      {hasSelected && isButton(menuList, "删除") && (
        <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ""}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ""}
          </Button>
        </Footer>
      )}
      <ModalForm param={param} setParam={setParam} />
    </>
  );
};
