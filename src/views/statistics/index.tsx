import { useState } from 'react';
import { Form, Input, Button, Table, Radio, Select, DatePicker, message } from 'antd';
import styled from "@emotion/styled";
import { useDay, useLineList, useMonth, useDownloadDay, useDownloadMonth } from './statistics';
import { useDocumentTitle } from '../../hook/useDocumentTitle';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select

export const Statistics = () => {
  useDocumentTitle("统计分析")
  const [form] = Form.useForm()
  const [value, setValue] = useState(0);
  const [params, setParams] = useState({
    subwayId: "",
    date: ""
  })

  const { data: dayList, isLoading: dayLoading } = useDay(params)
  const { data: monthList, isLoading: monthLoading } = useMonth(params)
  const { data: lineList } = useLineList()
  const { mutateAsync: downday } = useDownloadDay()
  const { mutateAsync: downmonth } = useDownloadMonth()

  console.log(dayList);


  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value })
  }

  const birthday = (obj: any, time: string) => {
    setParams({ ...params, date: time })
  }

  const birthmoth = (obj: any, time: string) => {
    console.log(time);

    setParams({ ...params, date: time })
  }

  const onChange = (e: any) => {
    // form.resetFields()
    setValue(e.target.value);
  };

  return (
    <>
      <Header>
        <Form
          form={form}
          name="basic"
          layout={"inline"}
        >
          <Radio.Group defaultValue={0} onChange={onChange}>
            <Radio value={0}>日报</Radio>
            <Radio value={1}>月报</Radio>
          </Radio.Group>

          <Form.Item
            name="subwayId"
          >
            <Select style={{ width: 120 }} placeholder={"地铁路线"} onChange={lineChange}>
              {
                lineList?.data.map((item: any) => (
                  <Option value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
          >
            {
              value === 0 ? <DatePicker locale={locale} onChange={birthday} /> : <DatePicker locale={locale} picker="month" onChange={birthmoth} />
            }

          </Form.Item>
        </Form>

        <div>
          <Button onClick={() => {
            downday(params).then(() => {
            }).catch((err) => {
              message.error(err.msg)
            })
          }} style={{ marginRight: "1rem" }}>下载日报</Button>
          <Button onClick={() => {
            downmonth(params).then(() => {
            }).catch((err) => {
              message.error(err.msg)
            })
          }}>下载月报</Button>
        </div>
      </Header>
      <Main>
        {/* 日报 */}
        {value === 0 ? (<div style={{ display: "flex" }}>
          <Table style={{ flex: "1" }} columns={
            [
              {
                title: '人员',
                dataIndex: 'name',
              },
              {
                title: '请站点',
                dataIndex: 'pleaseStand',
              },
              {
                title: '结束时间',
                dataIndex: 'downTime',
              },
            ]
          } dataSource={dayList?.data?.personDayVoList || []}
            pagination={false}
            rowKey={(item: any) => item.id}
            loading={dayLoading}
          />
          <Table style={{ flex: "1" }} columns={
            [
              {
                title: '工具',
                dataIndex: 'name',
              },
              {
                title: '数量',
                dataIndex: 'userNum',
              },
              {
                title: '返回编号',
                dataIndex: 'backNum',
              },
            ]
          } dataSource={dayList?.data?.toolDayVoList || []}
            pagination={false}
            rowKey={(item: any) => item.id}
            loading={dayLoading}
          />
        </div>) : (
          /* 月报 */
          <div style={{ display: "flex" }}>
            <Table style={{ flex: "1" }} columns={
              [
                {
                  title: '人员',
                  dataIndex: 'name',
                },
                {
                  title: '工作日',
                  dataIndex: 'workDay',
                },
                {
                  title: '离线数',
                  dataIndex: 'offlineNum',
                },
                {
                  title: '时间区别',
                  dataIndex: 'timeDifference',
                },

              ]
            } pagination={false} dataSource={monthList?.data?.personMonthVoList || []}
              rowKey={(item: any) => item.id}
              loading={monthLoading}
            />

            <Table style={{ flex: "1" }} columns={
              [
                {
                  title: '工具',
                  dataIndex: 'name',
                },
                {
                  title: '数量',
                  dataIndex: 'userNum',
                },
                {
                  title: '使用率',
                  dataIndex: 'useRate',
                },
              ]
            } pagination={false} dataSource={monthList?.data?.toolMonthVoList || []}
              rowKey={(item: any) => item.id}
              loading={monthLoading}
            />
          </div>
        )}
      </Main>
    </>
  );
};

const Header = styled.div`
  height: 12.5rem;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`

const Main = styled.div`
  background: #fff;
  height: 73rem;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
`