import {
  Form,
  Input,
  Button,
  message,
  Popconfirm,
  Table,
  Radio,
  Modal,
} from "antd";
import { ModalForm } from "./modal/ModlaForm";
import { useDel, useInit } from "./request";
import { useDebounce } from "hook/useDebounce";
import { useMaterialModal } from "./util";
import { useState } from "react";
import { noData } from "utils/verification";
import { Footer, Header, Main, SearchForm } from "components/Styled";
import { isButton } from "utils";
import { useAuth } from "context/auth-context";

export const MaterialType = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: "1",
  });
  const { menu } = useAuth();
  const menuList = menu
    .find((item: { [item: string]: unknown }) => item.name === "库存管理")
    .childMenu.find(
      (item: { [item: string]: unknown }) => item.name === "物资类型"
    ).childMenu;

  const { open, startEdit } = useMaterialModal();
  const { data, isLoading } = useInit(useDebounce(param, 500));
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel();

  const onChange = (e: any) => {
    setParam({
      ...param,
      type: e.target.value,
    });
  };

  const search = (item: any) => {
    setParam({ ...param, name: item.name, index: 1 });
  };

  const confirm = (item: any) => {
    Del(item.id)
      .then(() => {
        message.success("删除成功");
        setParam({ ...param, index: 1 });
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        message.error(err.msg);
      });
  };

  const cancel = () => {
    message.error("取消删除");
  };

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  const title = param.type === "1" ? "工具名称" : "物料名称";

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (keys: any, value: any) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.state === 1,
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
        <div className="right">物资类型</div>
        
      </Header>
      <Main>
        <SearchForm>
        <Form name="basic" onFinish={search} layout={"inline"}>
          <Radio.Group defaultValue={"1"} onChange={onChange}>
            <Radio value={"1"}>工具</Radio>
            <Radio value={"2"}>物料</Radio>
          </Radio.Group>
          <Form.Item label="" name="name">
            <Input
              placeholder={title}
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

        {isButton(menuList, "新增") && <Button onClick={open}>新增</Button>}
        </SearchForm>
        <Table
          columns={[
            {
              title: title,
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
              className: "hb",
              render: (item: any) => (
                <>
                  {isButton(menuList, "修改") && (
                    <Button type="link" onClick={() => startEdit(item.id)}>
                      修改
                    </Button>
                  )}

                  <Popconfirm
                    title={`是否要删除${item.name}`}
                    onConfirm={() => confirm?.(item)}
                    onCancel={cancel}
                    okText="是"
                    cancelText="否"
                  >
                    {isButton(menuList, "删除") && (
                      <Button type="link" danger>删除</Button>
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
          loading={isLoading}
          dataSource={data?.data}
          rowKey={(item: any) => item.id}
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
