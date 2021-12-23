import { Button, message, Table } from "antd";
import { Footer, Header, Main, SearchForm } from "components/Styled";
import { useAuth } from "context/auth-context";
import { useState } from "react";
import { isButton } from "utils";
import { ModalForm } from "./component/ModalForm";
import { useApp, useAppAdd, useAppUpdate } from "./request";

export const AppUpdate = () => {
  const { menu } = useAuth();
  const menuList = menu
    .find((item: { [item: string]: unknown }) => item.name === "系统管理")
    .childMenu.find(
      (item: { [item: string]: unknown }) => item.name === "APP更新"
    ).childMenu;

  const [param, setParam] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [packageId, setPackageId] = useState<number | undefined>(undefined);

  const { data, isLoading } = useApp(param);
  const { mutateAsync: mutateAdd } = useAppAdd();
  const { mutateAsync: mutateUpdate } = useAppUpdate();

  const startAdd = () => {
    setTitle("新增");
    setVisible(true);
  };

  const startUpdate = (id: number) => {
    setPackageId(id);
    setTitle("上传");
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const handleAdd = async (value: any) => {
    mutateAdd(value).then((res) => {
      if (res.code === 200) {
        message.success("新增成功");
        setVisible(false);
      }
    });
  };

  const handleUpdate = async (value: any) => {
    mutateUpdate({ ...value, packageId }).then(() => {
      message.success("上传成功");
      setVisible(false);
    });
  };

  const columns = [
    {
      title: "APP名称",
      dataIndex: "appName",
    },
    {
      title: "包Id",
      dataIndex: "packageId",
    },
    {
      title: "当前版本号",
      dataIndex: "versionCode",
    },
    {
      title: "更新策略",
      render: (item: any) => (
        <span>{item.updatePolicy === 1 ? "强制更新" : "不强制更新"}</span>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updateTimes",
    },
    {
      title: "操作",
      render: (item: any) => (
        <Button type="link" onClick={() => startUpdate(item.packageId)}>
          上传APP
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header>
        <div className="left"></div>
        <div className="right">APP更新</div>
      </Header>

      <Main>
        <SearchForm>
          {isButton(menuList, "新增") && (
            <Button onClick={startAdd}>新增</Button>
          )}
        </SearchForm>
        <Table
          columns={columns}
          dataSource={data?.data?.list}
          loading={isLoading}
          //   onChange={handleTableChange}
          pagination={{
            total: data?.count,
            current: param.pageNum,
            pageSize: param.pageSize,
            hideOnSinglePage: true,
          }}
          rowKey={(item) => item.id}
          //   rowSelection={rowSelection}
          size="small"
        />
      </Main>

      <ModalForm
        title={title}
        visible={visible}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        close={close}
      />
    </>
  );
};
