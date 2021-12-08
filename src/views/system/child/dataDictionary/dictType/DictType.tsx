import { Form, Input, Button, Table, Popconfirm, message, Modal } from "antd";
import styled from "@emotion/styled";
import { ModalForm } from "./ModalForm";
import { useDebounce } from "hook/useDebounce";
import { useDel, useInit } from "./request";
import { useDictTypeModal } from "./util";
import { useState } from "react";
import { noData } from "utils/verification";
import { Footer } from "components/Styled";
import { useParam } from "hook/useParam";

export const DictType = () => {
  const { param, setParam } = useParam();
  const { open, startEdit } = useDictTypeModal();
  const { data, isLoading } = useInit(useDebounce(param, 500));
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel();

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 });
  };

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

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
    setSelectedRowKeys([]);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
        <Form name="basic" onFinish={search} layout={"inline"}>
          <Form.Item name="name">
            <Input
              placeholder={"物资类型名称"}
              value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={open}>新增</Button>
      </Header>
      <Main>
        <Table
          columns={[
            {
              title: "物资类型名称",
              dataIndex: "name",
              key: "name",
              className: "hb",
            },
            {
              title: "创建者",
              dataIndex: "createBy",
              key: "id",
              className: "hb",
            },
            {
              title: "创建时间",
              dataIndex: "createTime",
              key: "id",
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
              className: "hb",
              render: (item: any) => (
                <>
                  <Button type="link" onClick={() => startEdit(item.id)}>
                    修改
                  </Button>
                  <Popconfirm
                    title={`是否要删除${item.name}`}
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText="是"
                    cancelText="否"
                  >
                    <Button type="link" danger>删除</Button>
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
          loading={isLoading}
          dataSource={data?.data}
          rowKey={(item: any) => item.id}
          locale={noData}
          rowSelection={rowSelection}
          size="small"
        />
      </Main>

      {hasSelected ? (
        <Footer>
          <div>{hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ""}</div>
          <Button type="primary" onClick={start} loading={mutaLoading}>
            {hasSelected ? `批量删除` : ""}
          </Button>
        </Footer>
      ) : undefined}
      <ModalForm param={param} setParam={setParam} />
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`;

const Main = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 0 1.5rem;
`;
