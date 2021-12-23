import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Spin,
  Table,
  Tabs,
} from "antd";
import { useAddToolModal } from "../util";
import { useListBy } from "views/warehouse/child/materialType/request";
import { useEffect, useState } from "react";
import * as usePersonList from "views/person/child/personManage/request";
import TextArea from "antd/lib/input/TextArea";
import "./style.css";
import { useDebounce } from "hook/useDebounce";
import { rules } from "utils/verification";
import { usePlanContext } from "views/work-plan/work-plan";
import { PersonSelect } from "components/PersonSelect";
const { TabPane } = Tabs;

/* 添加小组成员 */
const PersonList = () => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
  });

  const { data, isLoading } = usePersonList.useAllList(useDebounce(param, 500));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    // @ts-ignore
    /* setSelectedRowKeys([187]);
    sessionStorage.setItem("personList", JSON.stringify([{ personId: 187 }])); */
  }, []);

  const onSelectChange = (keys: any, value: any) => {
    const personList = value.map((key: any) => {
      return {
        personId: key.id,
      };
    });
    sessionStorage.setItem("personList", JSON.stringify(personList));

    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  };

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <Form layout={"inline"}>
              <Form.Item>
                <Input
                  placeholder={"姓名"}
                  value={param.name}
                  onChange={(evt) =>
                    setParam({ ...param, name: evt.target.value, index: 1 })
                  }
                />
              </Form.Item>
            </Form>
          </div>
          <Table
            columns={[
              {
                title: "姓名",
                dataIndex: "name",
              },
              {
                title: "卡号",
                dataIndex: "number",
              },
              // {
              //   title: "组长",
              //   render: (item: any) => (
              //     <Radio.Group onChange={onChange} value={value}>
              //       <Radio value={item.id}></Radio>
              //     </Radio.Group>
              //   ),
              // },
            ]}
            onChange={handleTableChange}
            pagination={{
              total: data?.count,
              current: param.index,
              pageSize: param.size,
              hideOnSinglePage: true,
            }}
            rowKey={(item: any) => item.id}
            dataSource={data?.data}
            rowSelection={rowSelection}
          />
        </>
      )}
    </>
  );
};

/* 添加工具 */

const Tool = () => {
  const columns = [
    {
      title: "工具",
      dataIndex: "name",
    },
    {
      title: "工具数量",
      dataIndex: "count",
    },
    {
      title: "需要的工具数量",
      render: (item: any) => (
        <>
          <InputNumber
            width={120}
            max={item.count}
            onChange={(e: any) => {
              // @ts-ignore
              setSelectedRowKeys([...selectedRowKeys, item.id]);
              item.newCount = e;
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
    type: 1,
  });

  const { data, isLoading } = useListBy(useDebounce(param, 500));

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (keys: any, value: any) => {
    const toolList = value.map((item: any) => {
      return {
        num: item.newCount,
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
      disabled: record.count === 0,
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

/* 添加物料 */

const Mater = () => {
  const columns = [
    {
      title: "物料",
      dataIndex: "name",
    },
    {
      title: "物料数量",
      dataIndex: "count",
    },
    {
      title: "需要的物料数量",
      render: (item: any) => (
        <>
          <InputNumber
            width={120}
            max={item.count}
            onChange={(e: any) => {
              // @ts-ignore
              setSelectedRowKeys([...selectedRowKeys, item.id]);
              item.newCount = e;
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

  const onSelectChange = (keys: any, value: any) => {
    const materList = value.map((key: any) => {
      return {
        num: key.newCount,
        materialId: key.id,
      };
    });

    sessionStorage.setItem("materList", JSON.stringify(materList));

    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    getCheckboxProps: (record: any) => ({
      disabled: record.groupMaterialList === true || record.count === 0,
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
        rowClassName={() => "editable-row"}
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

export const AddToolModal = ({ groupIndex }: { groupIndex: number }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState("2");
  const { ModalOpen, close } = useAddToolModal();
  const { groupList, setGroupList } = usePlanContext();

  const [obj, setObj] = useState<any>({
    groupName: "",
    leader: "",
    remark: "",
    personList: [],
    groupToolList: [],
    groupMaterialList: [],
  });

  const bootData = () => {
    let data = null;
    const newData = sessionStorage.getItem("group");
    if (newData) {
      data = JSON.parse(newData);
    }
    return data;
  };

  useEffect(() => {
    try {
      const data = bootData();
      form.setFieldsValue(data);
      setObj({
        ...obj,
        leader: data.leader,
        personList: data.personList,
        groupToolList: data.groupToolList,
        groupMaterialList: data.groupMaterialList,
      });
    } catch (error) {}
  }, [ModalOpen, form]);

  const closeModal = () => {
    form.resetFields();
    /* sessionStorage.removeItem("personList")
    sessionStorage.removeItem("groupToolList")
    sessionStorage.removeItem("groupMaterialList") */
    sessionStorage.removeItem("group");
    setObj(undefined);
    close();
  };

  const onChange = (key: string) => {
    setState(key);
  };

  // const onFinish = () => {
  //   if (bootData()) {
  //     let newObj = groupList;
  //     newObj.splice(groupIndex, 1, obj);
  //     setGroupList(newObj);
  //   } else {
  //     setGroupList([...groupList, obj]);
  //   }
  //   closeModal();
  // };

  const onFinish = (value: any) => {
    const personList = JSON.parse(sessionStorage.getItem("personList") || "[]")
    const groupToolList = JSON.parse(sessionStorage.getItem("toolList") || "[]")
    const groupMaterialList = JSON.parse(sessionStorage.getItem("materList") || "[]")
    const newGroupList = [{ ...value, personList, groupToolList, groupMaterialList }];

    setGroupList([...groupList, ...newGroupList])
    closeModal();
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      width={800}
      title={"人物清单"}
      visible={ModalOpen}
      onCancel={closeModal}
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="primary" onClick={onOk}>
          提交
        </Button>,
      ]}
    >
      <Form
        style={{ display: "flex", justifyContent: "space-between" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label={"小组名称"}
          name={"groupName"}
          rules={rules}
          style={{ flex: 1, padding: "0 1rem" }}
        >
          <Input
            placeholder={"请输入小组名称"}
            onChange={(evt) => setObj({ ...obj, groupName: evt.target.value })}
          />
        </Form.Item>

        <PersonSelect width={120} rul name="leader" label="小组组长" />

        <Form.Item
          label={"备注"}
          name={"remark"}
          style={{ flex: 1, padding: "0 1rem" }}
        >
          <TextArea placeholder={"请填写备注"} rows={1} />
        </Form.Item>
      </Form>
      <Tabs activeKey={state} onChange={onChange}>
        <TabPane tab="作业组员" key="2">
          <PersonList />
        </TabPane>
        <TabPane tab="作业工具" key="3">
          <Tool />
        </TabPane>
        <TabPane tab="作业物料" key="4">
          <Mater />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
