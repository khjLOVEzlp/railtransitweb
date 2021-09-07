import { Button, Form, FormInstance, Input, message, Modal, Select, Space, Spin, Table, Tabs } from "antd";
import 'moment/locale/zh-cn';
import { rules } from "utils/verification";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { usePlanTypeModal } from '../util'
import { useAdd, useMod } from "../request";
import { useContext, useEffect, useRef, useState } from "react";
import { useListBy, useMaterialType } from 'views/warehouse/child/materialType/request'
import React from "react";
import { useDebounce } from "hook/useDebounce";
const { TabPane } = Tabs;

type Props = {
  param: {
    index: number
    size: number
    type: string
  }
  setParam: (param: Props["param"]) => void
}

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

const Tool = ({ setObj, obj }: any) => {
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
  const { editingPlanType } = usePlanTypeModal()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [toolList, setToolList] = useState<any>([])

  useEffect(() => {
    if (editingPlanType) {
      setObj({
        ...obj,
        toolList: editingPlanType?.data?.toolList
      })
      const toolList = editingPlanType?.data?.toolList.map((key: { [key: string]: unknown }) => key.toolId)
      setSelectedRowKeys(toolList)
    }
  }, [editingPlanType])

  const start = () => {
    const list = toolList
    /* list.forEach((key: any) => {
      key["groupToolList"] = true
    }) */
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setToolList(list)
      setObj({
        ...obj,
        toolList
      })
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["toolId"] = key["id"]
    })
    setToolList(value)
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




/* 物料 */
const Mater = ({ obj, setObj }: any) => {
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
  const { editingPlanType } = usePlanTypeModal()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [materialList, setMaterialList] = useState<any>([])

  useEffect(() => {
    if (editingPlanType) {
      setObj({
        ...obj,
        materialList: editingPlanType?.data?.materialList
      })
      const materialList = editingPlanType?.data?.materialList.map((key: { [key: string]: unknown }) => key.materialId)
      setSelectedRowKeys(materialList)
    }
  }, [editingPlanType])

  const start = () => {
    const list = setMaterialList
    /* list.forEach((key: any) => {
      key["groupMaterialList"] = true
    }) */
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setMaterialList(list)
      setObj({
        ...obj,
        materialList
      })
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (keys: any, value: any) => {
    value.forEach((key: any) => {
      key["num"] = key["count"]
      key["materialId"] = key["id"]
    })
    setMaterialList(value)
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

export const ModalForm = ({ param, setParam }: Props) => {
  const [obj, setObj] = useState<any>({
    type: "",
    remark: "",
    materialList: [],
    toolList: [],
  })

  const [form] = Form.useForm();
  const { ModalOpen, close, isLoading, editingPlanType, editId } = usePlanTypeModal()
  const title = editingPlanType ? "修改" : "新增"
  const msg = editingPlanType ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingPlanType ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingPlanType?.data)
  }, [form, editingPlanType])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingPlanType?.data, ...obj, ...value, id: editId }).then(() => {
      form.resetFields()
      closeModal()
      msg()
    })
  }

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
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
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
            <Form.Item
              name="type"
              rules={rules}
              style={{ flex: 1 }}
            >
              <Input onChange={(e) => setObj({ ...obj, type: e.target.value })} placeholder={"请输入作业类型"} />
            </Form.Item>

            <Form.Item
              name="remark"
              style={{ flex: 1 }}
            >
              <TextArea onChange={(e) => setObj({ ...obj, remark: e.target.value })} rows={1} placeholder={"请填写备注"} />
            </Form.Item>
          </Form>
        )
      }
      <Tabs defaultActiveKey="1">
        <TabPane tab="工具" key="1">
          <Tool obj={obj} setObj={setObj} />
        </TabPane>
        <TabPane tab="物料" key="2">
          <Mater obj={obj} setObj={setObj} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
