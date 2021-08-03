import { Button, Form, Input, Modal, Spin, Table, Tabs } from "antd";
import { useAddToolModal } from '../util'
import { usePerson } from "views/person/child/personManage/request";
import { useMaterialType } from "utils/warehouse/materialType";
import { useState } from "react";
const { TabPane } = Tabs;

const PersonLIst = () => {
  const { data, isLoading } = usePerson()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (selectedRowKeys: any, value: any) => {
    console.log(selectedRowKeys);
    console.log(value);
    setSelectedRowKeys(selectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

const Tool = () => {
  const { data, isLoading } = useMaterialType()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (selectedRowKeys: any, value: any) => {
    console.log(selectedRowKeys);
    console.log(value);
    setSelectedRowKeys(selectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
                title: "工具",
                dataIndex: "name"
              },
              {
                title: "数量",
                dataIndex: "count"
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

const Mater = () => {
  const { data, isLoading } = useMaterialType()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (selectedRowKeys: any, value: any) => {
    console.log(selectedRowKeys);
    console.log(value);
    setSelectedRowKeys(selectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
                title: "工具",
                dataIndex: "name"
              },
              {
                title: "数量",
                dataIndex: "count"
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

export const AddToolModal = () => {
  const { ModalOpen, close } = useAddToolModal()
  /* const handleTableChange = (p: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  }; */

  return (
    <Modal
      width={800}
      title={"人物清单"}
      visible={ModalOpen}
      onCancel={close}
      footer={false}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="人物详情" key="1">
        </TabPane>
        <TabPane tab="作业组员" key="2">
          <PersonLIst />
        </TabPane>
        <TabPane tab="作业工具" key="3">
          <Tool />
        </TabPane>
        <TabPane tab="作业物料" key="4">
          <Mater />
        </TabPane>
      </Tabs>
    </Modal>
  )
}