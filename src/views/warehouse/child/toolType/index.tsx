import {
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  message,
  Select,
  Modal,
} from "antd";
import { useDel, useInit } from "./request";
import { ModalForm } from "./modal/ModalForm";
import { Tool } from "./tool";
import { useDebounce } from "hook/useDebounce";
import { useToolTypeModal, useViewTool } from "./util";
import { noData } from "utils/verification";
import { Footer, Header, Main, SearchForm } from "components/Styled";
import { createContext, useState, useContext } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "context/auth-context";
import { isButton } from "utils";

const { Option } = Select;

const ToolTypeContext = createContext<
  | {
      drawerId: number | undefined;
      setDrawerId: (drawerId: number | undefined) => void;
      editId: number | undefined;
      setEditId: (editId: number | undefined) => void;
    }
  | undefined
>(undefined);

export const ToolType = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: "",
  });
  const { menu } = useAuth();
  const menuList = menu
    .find((item: { [item: string]: unknown }) => item.name === "库存管理")
    .childMenu.find(
      (item: { [item: string]: unknown }) => item.name === "仓库管理"
    ).childMenu;

  const [drawerId, setDrawerId] = useState<number | undefined>(undefined);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [name, setName] = useState("");
  const { open, startEdit } = useToolTypeModal();
  const { startEdit: startTool } = useViewTool({});
  const { data, isLoading, isSuccess } = useInit(useDebounce(param, 500));
  const { mutateAsync: Del, isLoading: mutaLoading } = useDel();
  const queryClient = useQueryClient();

  const search = (item: any) => {
    setParam({ ...param, name: item.name, type: item.type, index: 1 });
  };

  const del = async (id: number) => {
    Del(id);
  };

  const confirm = (item: any) => {
    del(item.id).then((res: any) => {
      if (res) {
        message.success("删除成功");
        setParam({ ...param, index: 1 });
        setSelectedRowKeys([]);
      }
    });
  };

  const cancel = () => {
    message.error("取消删除");
  };

  const handleChange = (value: any) => {
    setParam({ ...param, type: value });
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
    <ToolTypeContext.Provider
      value={{ drawerId, setDrawerId, editId, setEditId }}
    >
      <Header>
        <div className="left"></div>
        <div className="right">仓库管理</div>
      </Header>
      <Main>
        <SearchForm>
          <Form name="basic" onFinish={search} layout={"inline"}>
            <Form.Item label="" name="name">
              <Input
                placeholder={"仓库名称"}
                value={param.name}
                onChange={(evt) =>
                  setParam({ ...param, name: evt.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="" name="type">
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                placeholder={"类型"}
              >
                <Option value={""}>所有</Option>
                <Option value={1}>轨行区内</Option>
                <Option value={2}>轨行区外</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>

          {isButton(menuList, "新增") && <Button onClick={open}>新增</Button>}
        </SearchForm>
        {isSuccess && (
          <Table
            columns={[
              {
                title: "仓库名称",
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
                title: "负责人",
                dataIndex: "personName",
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
                    {isButton(menuList, "查看库存") && (
                      <Button
                        type="link"
                        onClick={() => {
                          setName(item.name);
                          startTool(item.id);
                          queryClient.invalidateQueries("viewToolDetail");
                        }}
                      >
                        查看库存
                      </Button>
                    )}

                    {isButton(menuList, "修改") && (
                      <Button type="link" onClick={() => startEdit(item.id)}>
                        修改
                      </Button>
                    )}

                    <Popconfirm
                      title={`是否要删除${item.name}`}
                      onConfirm={() => confirm(item)}
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
        )}
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
      <Tool name={name} />
    </ToolTypeContext.Provider>
  );
};

export const useToolTypeContext = () => {
  const context = useContext(ToolTypeContext);
  if (!context) {
    throw new Error("useToolTypeContext必须在ToolType组件中使用");
  }
  return context;
};
