import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Spin,
  Table,
  Tabs,
} from "antd";
import "moment/locale/zh-cn";
import { rules } from "utils/verification";
import TextArea from "antd/lib/input/TextArea";
import { usePlanTypeModal } from "../util";
import { useEffect, useState } from "react";
import { useListBy } from "views/warehouse/child/materialType/request";
import { useDebounce } from "hook/useDebounce";
import { useAdd, useMod } from "api/work-plan/work-type";
const { TabPane } = Tabs;

const Tool = () => {
  const columns = [
    {
      title: "工具",
      dataIndex: "name",
    },
    {
      title: "工具数量",
      render: (item: any) => (
        <InputNumber
          defaultValue={item.count}
          width={120}
          min={0}
          onChange={(e: any) => {
            item.count = e;
          }}
        />
      ),
    },
  ];

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: 1,
  });

  const { data, isLoading } = useListBy(useDebounce(param, 500));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (keys: any, value: any) => {
    const toolList = value.map((item: any) => {
      return {
        num: item.count,
        toolId: item.id,
      };
    });

    sessionStorage.setItem("toolList", JSON.stringify(toolList));

    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    getCheckboxProps: (record: any) => ({
      // disabled: record.count === 0,
    }),
  };

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form layout={"inline"}>
          <Form.Item>
            <Input
              placeholder={"工具"}
              value={param.name}
              onChange={(evt) =>
                setParam({ ...param, name: evt.target.value, index: 1 })
              }
            />
          </Form.Item>
        </Form>
      </div>
      <Table
        loading={isLoading}
        bordered
        dataSource={data?.data}
        columns={columns}
        rowKey={(item: any) => item.id}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        pagination={{
          total: data?.count,
          current: param.index,
          pageSize: param.size,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

/* 物料 */
const Mater = () => {
  const columns = [
    {
      title: "物料",
      dataIndex: "name",
    },
    {
      title: "物料数量",
      render: (item: any) => (
        <>
          <InputNumber
            defaultValue={item.count}
            width={120}
            min={0}
            onChange={(e: any) => {
              item.count = e;
            }}
          />
        </>
      ),
    },
  ];

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: 2,
  });

  const { data, isLoading } = useListBy(useDebounce(param, 500));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // useEffect(() => {
  //   const material = JSON.parse(sessionStorage.getItem("materialList") || "[]");
  //   const ids = material.map((item: any) => item.materialId);
  //   setSelectedRowKeys(ids);
  // }, [data]);

  const onSelectChange = (keys: any, value: any) => {
    const materialList = value.map((key: any) => {
      return {
        num: key.count,
        materialId: key.id,
      };
    });

    sessionStorage.setItem("materialList", JSON.stringify(materialList));

    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    getCheckboxProps: (record: any) => ({
      // disabled: record.count === 0,
    }),
  };

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form layout={"inline"}>
          <Form.Item>
            <Input
              placeholder={"物料"}
              value={param.name}
              onChange={(evt) =>
                setParam({ ...param, name: evt.target.value, index: 1 })
              }
            />
          </Form.Item>
        </Form>
      </div>
      <Table
        loading={isLoading}
        bordered
        dataSource={data?.data}
        columns={columns}
        rowKey={(item: any) => item.id}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        pagination={{
          total: data?.count,
          current: param.index,
          pageSize: param.size,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

export const ModalForm = ({ param, setParam }: any) => {
  const [form] = Form.useForm();
  const { ModalOpen, close, isLoading, editingPlanType, editId } =
    usePlanTypeModal();
  const title = editingPlanType ? "修改" : "新增";
  const msg = editingPlanType
    ? () => {
        message.success("修改成功");
      }
    : () => {
        message.success("新增成功");
        setParam({ ...param, index: 1 });
      };
  const useMutateProject = editingPlanType ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    if (editingPlanType) {
      form.setFieldsValue(editingPlanType?.data);
      console.log(editingPlanType);
      sessionStorage.setItem(
        "toolList",
        JSON.stringify(editingPlanType?.data.toolList)
      );
      sessionStorage.setItem(
        "materialList",
        JSON.stringify(editingPlanType?.data.materialList)
      );
    }
  }, [form, editingPlanType]);

  const closeModal = () => {
    form.resetFields();
    sessionStorage.removeItem("toolList");
    sessionStorage.removeItem("materialList");
    close();
  };

  const onFinish = (value: any) => {
    const toolList = JSON.parse(sessionStorage.getItem("toolList") || "[]");
    const materialList = JSON.parse(
      sessionStorage.getItem("materialList") || "[]"
    );

    mutateAsync({
      ...editingPlanType?.data,
      ...value,
      toolList,
      materialList,
      id: editId,
    }).then(() => {
      form.resetFields();
      closeModal();
      msg();
    });
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={title}
      width={800}
      maskClosable={false}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onOk}
          loading={mutateLoading}
        >
          提交
        </Button>,
      ]}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Form
          style={{ display: "flex", justifyContent: "space-between" }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
          labelAlign="right"
          layout={"inline"}
        >
          <Form.Item name="type" rules={rules} style={{ flex: 1 }}>
            <Input placeholder={"请输入作业类型"} />
          </Form.Item>

          <Form.Item name="remark" style={{ flex: 1 }}>
            <TextArea rows={1} placeholder={"请填写备注"} />
          </Form.Item>
        </Form>
      )}
      <Tabs defaultActiveKey="1">
        <TabPane tab="工具" key="1">
          <Tool />
        </TabPane>
        <TabPane tab="物料" key="2">
          <Mater />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
