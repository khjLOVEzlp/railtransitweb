import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { Button, Space } from 'antd';
import { useState } from 'react';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';

const columns = [
  {
    title: '体温',
    dataIndex: 'temperature',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
]

const dataSource = [
  {
    temperature: "36.2",
    key: 1
  },
  {
    temperature: "33.2",
    key: 2
  },
  {
    temperature: "34.2",
    key: 3
  },
  {
    temperature: "35.2",
    key: 4
  },
  {
    temperature: "36.2",
    key: 5
  },
]

export const Statistics = () => {
  const actionRef = useRef();
  const [state, setState] = useState<any>([])
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        dataSource={dataSource}
        rowKey={item => item.key}
        rowSelection={{
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space>
            选择
          </Space>
        )}
        tableAlertOptionRender={() => {
          return (
            <Space size={10}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新增
          </Button>
        ]}
      />
    </>
  )
}