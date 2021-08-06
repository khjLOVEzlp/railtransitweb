import { useState } from 'react';
import { Form, Button, Table, Radio, Select, DatePicker } from 'antd';
import { useDay, useLineList, useMonth } from './request';
import locale from 'antd/es/date-picker/locale/zh_CN';
import qs from "qs";
import { useAuth } from "context/auth-context";
import { noData } from 'utils/verification';
import { Header, Main } from 'components/Styled';

const apiUrl = process.env.REACT_APP_API_URL;
const { Option } = Select

export const WorkCount = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(0);
  const [params, setParams] = useState({
    subwayId: "",
    date: ""
  })

  const { user } = useAuth()

  const { data: dayList, isLoading: dayLoading } = useDay(params)
  const { data: monthList, isLoading: monthLoading } = useMonth(params)
  const { data: lineList } = useLineList()

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value })
  }

  const birthday = (obj: any, time: string) => {
    setParams({ ...params, date: time })
  }

  const birthmoth = (obj: any, time: string) => {
    setParams({ ...params, date: time })
  }

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const downDay = () => {
    fetch(`${apiUrl}report/downloadDay?${qs.stringify(params)}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `${user?.jwtToken}`
      },
    }).then((res) => {
      console.log(res)
      return res.blob();
    }).then(blob => {
      let bl = new Blob([blob], { type: blob.type });
      let fileName = params.date + ".doc";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
  }

  const downMonth = () => {
    fetch(`${apiUrl}report/downloadMonth?${qs.stringify(params)}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `${user?.jwtToken}`
      },
    }).then((res) => {
      return res.blob();
    }).then(blob => {
      let bl = new Blob([blob], { type: blob.type });
      let fileName = params.date + ".doc";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
  }

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
            <Select
              style={{ width: 120 }}
              placeholder={"地铁路线"}
              onChange={lineChange}
              showSearch
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
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
              value === 0 ? <DatePicker locale={locale} onChange={birthday} /> :
                <DatePicker locale={locale} picker="month" onChange={birthmoth} />
            }
          </Form.Item>
        </Form>

        <div>
          <Button onClick={downDay} style={{ marginRight: "1rem" }}>下载日报</Button>
          <Button onClick={downMonth}>下载月报</Button>
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
            rowKey={(item: any, index: any) => index}
            loading={dayLoading}
            locale={noData}
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
            rowKey={(item: any, index: any) => index}
            loading={dayLoading}
            locale={noData}
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
              rowKey={(item: any, index: any) => index}
              loading={monthLoading}
              locale={noData}
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
              rowKey={(item: any, index: any) => index}
              loading={monthLoading}
              locale={noData}
            />
          </div>
        )}
      </Main>
    </>
  );
};
