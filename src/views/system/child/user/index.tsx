import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  message,
  Modal,
  Dropdown,
  Menu,
} from "antd";
import { ModalForm } from "./modal/ModalForm";
import { useDel, useInit } from "./request";
import { useHttp } from "utils/http";
import qs from "qs";
import { useDebounce } from "hook/useDebounce";
import { PassModal } from "components/PassModal";
import { useUserModal } from "./util";
import { Search } from "utils/typings";
import { noData } from "utils/verification";
import { Footer, Header, Main, SearchForm } from "components/Styled";
import { useAuth } from "context/auth-context";
import { useParam } from "hook/useParam";
import { isButton } from "utils";

export const User = () => {
  const { menu = [] } = useAuth();
  const menuList = menu
    .find((item: { [item: string]: unknown }) => item.name === "系统管理")
    .childMenu.find(
      (item: { [item: string]: unknown }) => item.name === "用户管理"
    ).childMenu;
  const [passwdVisible, setPasswdVisible] = useState(false);
  const [passId, setPassId] = useState<number>();
  const client = useHttp();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const hasSelected = selectedRowKeys.length > 0;
  const { param, setParam } = useParam();
  const { open, startEdit } = useUserModal();
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

  const confirmDeleteProject = (item: any) => {
    Modal.confirm({
      title: `是否要删除${item.name}`,
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        confirm(item.id);
      },
    });
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
    setSelectedRowKeys([]);
  };

  const search = (item: Search) => {
    setParam({ ...param, name: item.name, index: 1 });
  };

  const modPass = (passId: number) => {
    setPassId(passId);
    setPasswdVisible(true);
  };

  const onCreate = (values: any) => {
    client(`user/resetPassWord?${qs.stringify({ ...values, id: passId })}`, {
      method: "POST",
    })
      .then(() => {
        message.success("修改成功");
        setPasswdVisible(false);
      })
      .catch((error) => {
        message.error(error.msg);
      });
  };

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
        <div className="left"></div>
        <div className="right">用户管理</div>
      </Header>
      <Main>
        <SearchForm>
          <Form name="basic" onFinish={search} layout={"inline"}>
            <Form.Item label="" name="name">
              <Input
                placeholder={"用户名"}
                value={param.name}
                onChange={(evt) =>
                  setParam({ ...param, name: evt.target.value })
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
              title: "用户名",
              dataIndex: "name",
              key: "id",
              ellipsis: true,
              className: "hb",
            },
            {
              title: "账号",
              dataIndex: "loginName",
              key: "id",
              ellipsis: true,
              className: "hb",
            },
            {
              title: "归属部门",
              dataIndex: "departmentName",
              key: "id",
              ellipsis: true,
              className: "hb",
            },
            /* {
                title: "登陆日期",
                dataIndex: 'loginDate',
                key: 'id',
                ellipsis: true
              }, */
            {
              title: "创建时间",
              dataIndex: "createTime",
              key: "id",
              ellipsis: true,
              className: "hb",
            },
            {
              title: "备注",
              dataIndex: "remark",
              key: "remark",
              ellipsis: true,
              className: "hb",
            },
            {
              title: "操作",
              key: "id",
              className: "hb",
              ellipsis: true,
              render: (item) => (
                <Dropdown
                  overlay={
                    <Menu>
                      {isButton(menuList, "重置密码") && (
                        <Menu.Item
                          onClick={() => modPass(item.id)}
                          key={"pass"}
                        >
                          重置密码
                        </Menu.Item>
                      )}

                      {isButton(menuList, "修改") && (
                        <Menu.Item
                          onClick={() => startEdit(item.id)}
                          key={"edit"}
                        >
                          修改
                        </Menu.Item>
                      )}
                      {isButton(menuList, "删除") && (
                        <Menu.Item
                          onClick={() => confirmDeleteProject(item)}
                          key={"delete"}
                        >
                          删除
                        </Menu.Item>
                      )}
                    </Menu>
                  }
                >
                  <Button type={"link"}>...</Button>
                </Dropdown>
              ),
            },
          ]}
          pagination={{
            total: data?.count,
            current: param.index,
            pageSize: param.size,
            hideOnSinglePage: true,
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
      <PassModal
        passwd={"reset"}
        visible={passwdVisible}
        onCreate={onCreate}
        onCancel={() => {
          setPasswdVisible(false);
        }}
      />
    </>
  );
};
