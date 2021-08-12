import { Button, Form, Input, List, Modal, Select, Spin, Table, Tabs } from "antd";
import { useAddToolModal } from '../util'
import { usePerson } from "views/person/child/personManage/request";
import { useMaterialType } from "views/warehouse/child/materialType/request";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { usePlanContext } from "../../../index";
import TextArea from "antd/lib/input/TextArea";
import './style.css'
const { TabPane } = Tabs;

const PersonLIst = ({ setState }: any) => {
  const { data, isLoading } = usePerson()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [personList, setPersonList] = useState<any>([])
  const { groupList, setGroupList } = usePlanContext()
  const start = () => {
    const list = personList
    list.forEach((key: any) => {
      key["a"] = true
    })
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setPersonList(list)
      // setGroupList([{ personList }])
      sessionStorage.setItem("personList", JSON.stringify(personList))
      setState("1")
      setLoading(false)
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
      disabled: record.a === true,
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
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                确定
              </Button>
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

const EditableContext = React.createContext(null);

const Tool = ({ setState }: any) => {
  const { data, isLoading, isSuccess } = useMaterialType()
  const [dataSu, setDataSu] = useState<any>([])
  const [groupToolList, setGroupToolList] = useState<any>([])
  const { groupList, setGroupList } = usePlanContext()

  useEffect(() => {
    if (isSuccess) {
      setDataSu(data.data)
    }
  }, [])

  // @ts-ignore
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        {/* @ts-ignore */}
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }: any) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        // @ts-ignore
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      // @ts-ignore
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };

    const save = async () => {
      try {
        // @ts-ignore
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      // setGroupList([{ groupToolList }])
      sessionStorage.setItem("groupToolList", JSON.stringify(groupToolList))
      setLoading(false)
      setState("1")
    }, 1000)
  }

  const onSelectChange = (selectedRowKeys: any, value: any) => {
    setSelectedRowKeys(selectedRowKeys);
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["toolId"] = key["id"]
    })
    setGroupToolList(value)
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.count === 0,
      name: record.name,
    }),
  }

  const cloumns = [
    {
      title: "工具",
      dataIndex: "name"
    },
    {
      title: "数量",
      dataIndex: "count",
      editable: true,
    }
  ]

  const handleSave = (row: any) => {
    const newData = [...data?.data];
    const index = newData.findIndex((item) => {
      return row.key == item.key
    });
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSu(newData)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const clo = cloumns.map((col) => {
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
      })
    };
  });

  return (
    <>
      {
        isLoading ? (
          <Spin />
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                确定
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
              </span>
            </div>
            <Table
              columns={clo}
              components={components}
              rowKey={(item: any) => item.id}
              dataSource={dataSu}
              rowSelection={rowSelection}
            />
          </>
        )
      }
    </>
  )
}

const Mater = ({ setState }: any) => {
  const { data, isLoading, isSuccess } = useMaterialType()
  const [dataSu, setDataSu] = useState<any>([])
  const [groupMaterialList, setGroupMaterialList] = useState<any>([])

  useEffect(() => {
    if (isSuccess) {
      setDataSu(data.data)
    }
  }, [])

  // @ts-ignore
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        {/* @ts-ignore */}
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }: any) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        // @ts-ignore
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      // @ts-ignore
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    };

    const save = async () => {
      try {
        // @ts-ignore
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      sessionStorage.setItem("groupMaterialList", JSON.stringify(groupMaterialList))
      setLoading(false)
      setState("1")
    }, 1000)
  }

  const onSelectChange = (selectedRowKeys: any, value: any) => {
    setSelectedRowKeys(selectedRowKeys);
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["materialId"] = key["id"]
    })
    setGroupMaterialList(value)
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record.count === 0,
      name: record.name,
    }),
  }

  const cloumns = [
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

  const handleSave = (row: any) => {
    const newData = [...data?.data];
    const index = newData.findIndex((item) => {
      return row.key == item.key
    });
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSu(newData)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const clo = cloumns.map((col) => {
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
      })
    };
  });

  return (
    <>
      {
        isLoading ? (
          <Spin />
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                确定
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `已选择 ${selectedRowKeys.length} 条` : ''}
              </span>
            </div>
            <Table
              columns={clo}
              components={components}
              rowKey={(item: any) => item.id}
              dataSource={dataSu}
              rowSelection={rowSelection}
            />
          </>
        )
      }
    </>
  )
}

export const AddToolModal = () => {
  const [state, setState] = useState("1")
  const { data: personList } = usePerson()
  const { ModalOpen, close } = useAddToolModal()
  const { groupList, setGroupList } = usePlanContext()
  const [param, setParam] = useState({
    groupName: "",
    leader: "",
    remark: ""
  })
  /* const handleTableChange = (p: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  }; */

  const obj = {
    groupName: param.groupName,
    leader: param.leader,
    remark: param.remark,
    personList: JSON.parse(sessionStorage.getItem("personList") || "[]"),
    groupToolList: JSON.parse(sessionStorage.getItem("groupToolList") || "[]"),
    groupMaterialList: JSON.parse(sessionStorage.getItem("groupMaterialList") || "[]")
  }

  const closeModal = () => {
    close()
  }

  const onChange = (key: string) => {
    setState(key)
  }

  const submit = () => {
    setGroupList([...groupList, obj])
    closeModal()
  }

  return (
    <Modal
      width={800}
      title={"人物清单"}
      visible={ModalOpen}
      onCancel={closeModal}
      footer={false}
      destroyOnClose={true}
    >
      <Tabs activeKey={state} onChange={onChange}>
        <TabPane tab="人物详情" key="1">
          {/* {
            groupList?.map((item: any, index: number) => (
              
            ))
          } */}

          <List>
            <Form style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label={"小组名称"}
                name={"groupName"}
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <Input onChange={(evt) => setParam({ ...param, groupName: evt.target.value })} />
              </Form.Item>

              <Form.Item
                label="组长"
                name="leader"
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  // @ts-ignore
                  onChange={(value) => setParam({ ...param, leader: value })}
                >
                  {personList?.data.map((item: any, index: number) => <Select.Option value={item.id}
                    key={index}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                label={"备注"}
                name={"remark"}
                style={{ flex: 1, padding: "0 1rem" }}
              >
                <TextArea rows={1} />
              </Form.Item>
            </Form>

            <div style={flex}>作业组员：</div>
            {
              obj?.personList ? obj?.personList.map((key: any) => (
                <List.Item>
                  {key.name}
                </List.Item>
              )) : ""
            }

            <div style={flex}>作业工具：</div>
            {
              obj?.groupToolList ? obj?.groupToolList.map((key: any) => (
                <List.Item>
                  <span>{key.name}</span>
                  <span>{key.count}</span>
                </List.Item>
              )) : ""
            }

            <div style={flex}>作业物料：</div>
            {
              obj?.groupMaterialList ? obj?.groupMaterialList.map((key: any) => (
                <List.Item>
                  <span>{key.name}</span>
                  <span>{key.count}</span>
                </List.Item>
              )) : ""
            }

            <List.Item style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <Button type={"primary"} style={{ textAlign: "right", marginTop: "1rem" }} onClick={() => submit()}>确定</Button>
            </List.Item>
          </List>

        </TabPane>
        <TabPane tab="作业组员" key="2">
          <PersonLIst setState={setState} />
        </TabPane>
        <TabPane tab="作业工具" key="3">
          <Tool setState={setState} />
        </TabPane>
        <TabPane tab="作业物料" key="4">
          <Mater setState={setState} />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

const flex = { display: "flex", alignItems: "center", margin: "15px 0" }