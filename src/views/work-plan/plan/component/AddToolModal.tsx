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
    setSelectedRowKeys([187]);
    sessionStorage.setItem("personList", JSON.stringify([{ personId: 187 }]));
  }, []);

  const onSelectChange = (keys: any, value: any) => {
    const personList = value.map((key: any) => {
      return {
        personId: key.id,
      };
    });
    sessionStorage.setItem("personList", JSON.stringify(personList));

    setSelectedRowKeys(keys);

    console.log(keys);
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
        num: item.count,
        toolId: item.id,
      };
    });
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.count === 0,
    // }),
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

const Mater = ({ obj, setObj }: any) => {
  const columns = [
    {
      title: "物料",
      dataIndex: "name",
    },
    {
      title: "数量",
      dataIndex: "count",
      editable: true,
      disabled: true,
    },
  ];

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: 2,
  });

  const { data, isLoading, isSuccess } = useListBy(useDebounce(param, 500));
  const { ModalOpen } = useAddToolModal();
  const [dataSource, setDataSource] = useState<any>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [groupMaterialList, setGroupMaterialList] = useState<any>([]);

  useEffect(() => {
    setObj({
      ...obj,
      groupMaterialList: obj?.groupMaterialList,
    });
    const groupMaterialList = obj?.groupMaterialList?.map(
      (key: { [key: string]: unknown }) => key.materialId
    );
    setSelectedRowKeys(groupMaterialList);
  }, [ModalOpen]);

  const start = () => {
    const list = groupMaterialList;
    /* list.forEach((key: any) => {
      key["groupMaterialList"] = true
    }) */
    setLoading(true);
    setTimeout(() => {
      // setSelectedRowKeys([])
      setGroupMaterialList(list);
      sessionStorage.setItem(
        "groupMaterialList",
        JSON.stringify(groupMaterialList)
      );
      setObj({
        ...obj,
        groupMaterialList,
      });
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["num"] = key["count"];
      key["materialId"] = key["id"];
    });
    setGroupMaterialList(value);
    setSelectedRowKeys(keys);
  };

  const hasSelected = selectedRowKeys?.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.groupMaterialList === true || record.count === 0,
    }),
  };

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  useEffect(() => {
    if (isSuccess) {
      setDataSource([...data.data]);
    }
  }, [isSuccess, data?.data]);

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    // @ts-ignore
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    // @ts-ignore
    newData.splice(index, 1, {
      // @ts-ignore
      ...item,
      ...row,
    });
    // @ts-ignore
    setDataSource([...newData]);
  };

  const newColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

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
          <Form.Item>
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              确定
            </Button>
          </Form.Item>
          <Form.Item>
            <span style={{ color: "red" }}>(注意：请勾选数量大于 0 物料)</span>
          </Form.Item>
        </Form>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ""}
        </span>
      </div>
      <Table
        loading={isLoading}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={newColumns as any}
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

  const onFinish = () => {
    if (bootData()) {
      let newObj = groupList;
      newObj.splice(groupIndex, 1, obj);
      setGroupList(newObj);
    } else {
      setGroupList([...groupList, obj]);
    }

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
          {/* <EditableTable /> */}
        </TabPane>
        <TabPane tab="作业物料" key="4">
          <Mater setState={setState} setObj={setObj} obj={obj} />
        </TabPane>

        {/* <TabPane tab="人物详情" key="1">
          <List>
            {
              obj?.personList && obj?.personList.length > 0 ? <div style={flex}>作业组员：</div> : undefined
            }

            {
              obj?.personList ? obj?.personList.map((key: any) => (
                <List.Item>
                  {key.name}
                </List.Item>
              )) : ""
            }

            {
              obj?.groupToolList && obj?.groupToolList.length > 0 ? <div style={flex}>作业工具：</div> : undefined
            }
            {
              obj?.groupToolList ? obj?.groupToolList.map((key: any) => (
                <List.Item>
                  <span>{key.name}</span>
                  <span>{key.count}</span>
                </List.Item>
              )) : ""
            }

            {
              obj?.groupMaterialList && obj?.groupMaterialList.length > 0 ? <div style={flex}>作业物料：</div> : undefined
            }

            {
              obj?.groupMaterialList ? obj?.groupMaterialList.map((key: any) => (
                <List.Item>
                  <span>{key.name}</span>
                  <span>{key.count}</span>
                </List.Item>
              )) : ""
            }
          </List>
        </TabPane> */}
      </Tabs>
    </Modal>
  );
};
