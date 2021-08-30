import { Button, Form, Input, List, Modal, Select, Spin, Table, Tabs } from "antd";
import { useAddToolModal } from '../util'
import * as usePersonList from "views/person/child/personManage/request";
import { useListBy } from "views/warehouse/child/materialType/request";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { usePlanContext } from "../../../index";
import TextArea from "antd/lib/input/TextArea";
import './style.css'
import { useDebounce } from "hook/useDebounce";
import { FormInstance } from 'antd/lib/form';
import { rules } from "utils/verification";
const { TabPane } = Tabs;

/* 添加小组成员 */

const PersonLIst = ({ setState, setObj, obj }: any) => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: ""
  })
  const { data, isLoading } = usePersonList.useInit(useDebounce(param, 500))
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [personList, setPersonList] = useState<any>([])
  const start = () => {
    const list = personList
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setPersonList(list)
      sessionStorage.setItem("personList", JSON.stringify(personList))
      setObj({
        ...obj,
        personList
      })
      setLoading(false)
      setState("3")
    }, 1000)
  }

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["personId"] = key["id"]
    })
    setPersonList(value)
    setSelectedRowKeys(keys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
    })
  }

  return (
    <>
      {
        isLoading ? (
          <Spin />
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <Form layout={"inline"}>
                <Form.Item>
                  <Input
                    placeholder={"姓名"}
                    value={param.name}
                    onChange={(evt) => setParam({ ...param, name: evt.target.value, index: 1 })}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    确定
                  </Button>
                </Form.Item>
              </Form>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
              </span>
            </div>
            <Table columns={[
              {
                title: "姓名",
                dataIndex: "name"
              },
              {
                title: "卡号",
                dataIndex: "number"
              },
              {

              }
            ]}
              rowKey={(item: any) => item.id}
              dataSource={data?.data}
              rowSelection={rowSelection}
            />
          </>
        )
      }
    </>
  )
}

/* 添加工具 */

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }

  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: "请输入数量"
          },
          {
            pattern: new RegExp(/^[1-9]\d*$/),
            message: "数量不能为负"
          }
        ]}
      >
        <Input type={"number"} ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const Tool = ({ setState, setObj, obj }: any) => {
  const columns = [
    {
      title: "工具",
      dataIndex: "name"
    },
    {
      title: "数量",
      dataIndex: "count",
      editable: true,
      disabled: true
    }
  ]

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: 1
  })

  const { data, isLoading, isSuccess } = useListBy(useDebounce(param, 500))

  const [dataSource, setDataSource] = useState<any>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [groupToolList, setGroupToolList] = useState<any>([])
  const start = () => {
    const list = groupToolList
    /* list.forEach((key: any) => {
      key["groupToolList"] = true
    }) */
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setGroupToolList(list)
      sessionStorage.setItem("groupToolList", JSON.stringify(groupToolList))
      setObj({
        ...obj,
        groupToolList
      })
      setLoading(false)
      setState("4")
    }, 1000)
  }

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["toolId"] = key["id"]
    })
    setGroupToolList(value)

    setSelectedRowKeys(keys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.groupToolList === true || record.count === 0,
    })
  }

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  useEffect(() => {
    if (isSuccess) {
      setDataSource([...data.data])
    }
  }, [isSuccess, data?.data])

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    // @ts-ignore
    const index = newData.findIndex(item => row.key === item.key);
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

  const newColumns = columns.map(col => {
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
        handleSave
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form layout={"inline"}>
          <Form.Item>
            <Input
              placeholder={"工具"}
              value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value, index: 1 })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
        </span>
      </div>
      <Table
        loading={isLoading}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={newColumns as any}
        rowKey={(item: any) => item.id}
        rowSelection={rowSelection}
        onChange={handleTableChange}
      />
    </div>
  );

}

/* 添加物料 */

const Mater = ({ setState, obj, setObj }: any) => {
  const columns = [
    {
      title: "物料",
      dataIndex: "name"
    },
    {
      title: "数量",
      dataIndex: "count",
      editable: true,
      disabled: true
    }
  ]

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    name: "",
    type: 2
  })

  const { data, isLoading, isSuccess } = useListBy(useDebounce(param, 500))

  const [dataSource, setDataSource] = useState<any>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [groupMaterialList, setGroupMaterialList] = useState<any>([])
  const start = () => {
    const list = groupMaterialList
    /* list.forEach((key: any) => {
      key["groupMaterialList"] = true
    }) */
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setGroupMaterialList(list)
      sessionStorage.setItem("groupMaterialList", JSON.stringify(groupMaterialList))
      setObj({
        ...obj,
        groupMaterialList
      })
      setLoading(false)
      setState("1")
    }, 1000)
  }

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["materialId"] = key["id"]
    })
    setGroupMaterialList(value)
    setSelectedRowKeys(keys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.groupMaterialList === true || record.count === 0,
    })
  }

  const handleTableChange = (p: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  useEffect(() => {
    if (isSuccess) {
      setDataSource([...data.data])
    }
  }, [isSuccess, data?.data])

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    // @ts-ignore
    const index = newData.findIndex(item => row.key === item.key);
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

  const newColumns = columns.map(col => {
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
        handleSave
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form layout={"inline"}>
          <Form.Item>
            <Input
              placeholder={"物料"}
              value={param.name}
              onChange={(evt) => setParam({ ...param, name: evt.target.value, index: 1 })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
        </span>
      </div>
      <Table
        loading={isLoading}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={newColumns as any}
        rowKey={(item: any) => item.id}
        rowSelection={rowSelection}
        onChange={handleTableChange}
      />
    </div>
  );

}

export const AddToolModal = () => {
  const [form] = Form.useForm()
  const [state, setState] = useState("2")
  const { data: personList } = usePersonList.useInit()
  const { ModalOpen, close } = useAddToolModal()
  const { groupList, setGroupList } = usePlanContext()
  /* const [param, setParam] = useState({
    groupName: "",
    leader: "",
    remark: ""
  }) */

  const [obj, setObj] = useState<any>({
    groupName: "",
    leader: "",
    remark: "",
    personList: [],
    groupToolList: [],
    groupMaterialList: []
  })

  useEffect(() => {
    try {
      console.log(groupList);

      const data = JSON.parse(sessionStorage.getItem("group") || "")
      form.setFieldsValue(data)
      setObj({
        ...obj,
        personList: data.personList,
        groupToolList: data.groupToolList,
        groupMaterialList: data.groupMaterialList
      })
    } catch (error) {

    }
  }, [ModalOpen, form, obj])

  const closeModal = () => {
    form.resetFields()
    /* sessionStorage.removeItem("personList")
    sessionStorage.removeItem("groupToolList")
    sessionStorage.removeItem("groupMaterialList") */
    sessionStorage.removeItem("group")
    setObj(undefined)
    close()
  }

  const onChange = (key: string) => {
    setState(key)
  }

  const onFinish = () => {
    setGroupList([...groupList, obj])
    closeModal()
  }

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
      footer={state === "1" ? [
        <Button key="submit" type="primary" onClick={onOk} >提交</Button>
      ] : false}
    >
      <Tabs activeKey={state} onChange={onChange}>
        <TabPane tab="作业组员" key="2">
          <PersonLIst setState={setState} setObj={setObj} obj={obj} />
        </TabPane>
        <TabPane tab="作业工具" key="3">
          <Tool setState={setState} setObj={setObj} obj={obj} />
          {/* <EditableTable /> */}
        </TabPane>
        <TabPane tab="作业物料" key="4">
          <Mater setState={setState} setObj={setObj} obj={obj} />
        </TabPane>

        <TabPane tab="人物详情" key="1">
          <List>
            <Form style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }} form={form} onFinish={onFinish}>
              <Form.Item
                label={"小组名称"}
                name={"groupName"}
                rules={rules}
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <Input placeholder={"请输入小组名称"} onChange={(evt) => setObj({ ...obj, groupName: evt.target.value })} />
              </Form.Item>

              <Form.Item
                label="组长"
                name="leader"
                rules={rules}
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  placeholder={"请选择小组组长"}
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => setObj({ ...obj, leader: value })}
                >
                  {personList?.data.map((item: any, index: number) => <Select.Option value={item.id} disabled={groupList.find((key: any) => key.leader === item.id)}
                    key={index}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                label={"备注"}
                name={"remark"}
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <TextArea placeholder={"请填写备注"} rows={1} />
              </Form.Item>
            </Form>
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
        </TabPane>
      </Tabs>
    </Modal>
  )
}

const flex = { display: "flex", alignItems: "center", margin: "15px 0" }