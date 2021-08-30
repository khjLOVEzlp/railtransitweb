import { useEffect, useState } from 'react';
import { Form, Button, Table, Radio, Select, DatePicker, List, Typography } from 'antd';
import { useDay, useLineList, useMonth, useDownloadDay, useDownloadMonth } from './request';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Header, Main } from 'components/Styled';
import moment from 'moment';

const { Option } = Select

export const WorkCount = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState(0);
  const [params, setParams] = useState({
    subwayId: "",
    date: ""
  })

  const { data: lineList, isSuccess } = useLineList()

  useEffect(() => {
    if (isSuccess && lineList.data && lineList.data.length > 0) {
      if (value === 0) {
        setParams({ ...params, date: String(moment().format('YYYY-MM-DD')), subwayId: lineList.data[0].id })
      } else {
        setParams({ ...params, date: String(moment().format('YYYY-MM')), subwayId: lineList.data[0].id })
      }
    }
  }, [value, isSuccess, lineList?.data])

  useEffect(() => {
    if (isSuccess && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id })
    }
  }, [isSuccess, value, form, lineList?.data])

  const { data: dayList, isLoading: dayLoading } = useDay(params, value)
  const { data: monthList, isLoading: monthLoading } = useMonth(params, value)

  const { mutateAsync: mutaDay } = useDownloadDay()
  const { mutateAsync: mutaMonth } = useDownloadMonth()

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
    form.resetFields()
  };

  const downDay = () => {
    mutaDay(params).then(blob => {
      let fileName = params.date + ".doc";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
  }

  const downMonth = () => {
    mutaMonth(params).then(blob => {
      let fileName = params.date + ".doc";
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
  }

  const dateFormat = 'YYYY-MM-DD';
  const monthFormat = 'YYYY-MM';

  return (
    <>
      <Header>
        <Form
          form={form}
          name="basic"
          layout={"inline"}
        >
          <Radio.Group onChange={onChange}>
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
              value === 0 ? <DatePicker locale={locale} onChange={birthday} defaultValue={moment(moment().format(), dateFormat)} format={dateFormat} /> :
                <DatePicker locale={locale} picker="month" onChange={birthmoth} defaultValue={moment(moment().format(), monthFormat)} format={monthFormat} />
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
        {value === 0 ? (
          <div>
            <List header={<div>一、作业概况</div>}>
              <List.Item>
                <Typography.Text>作业日期：{dayList?.data?.workDay || "无"}</Typography.Text>
                <Typography.Text>作业次数：{dayList?.data?.workNum || "无"}</Typography.Text>
                <Typography.Text>投入人力：{dayList?.data?.personNum || "无"}</Typography.Text>
              </List.Item>
            </List>

            <List header={<div>二、作业人员情况</div>}>
              <Table
                rowKey={key => key.id}
                dataSource={dayList?.data?.personDayVoList}
                pagination={false}
                loading={dayLoading}

                columns={[
                  {
                    title: "姓名",
                    dataIndex: "name"
                  },
                  {
                    title: "所属班别",
                    dataIndex: "className"
                  },
                  {
                    title: "请站点",
                    dataIndex: "pleaseStand"
                  },
                  {
                    title: "下线时间",
                    dataIndex: "downTime"
                  },
                  {
                    title: "清点时间",
                    dataIndex: "returnTime"
                  },
                  {
                    title: "备注",
                    dataIndex: "remark"
                  }
                ]}
              />
            </List>

            <List header={<div>三、工器具使用情况</div>}>
              <Table
                rowKey={key => key.id}
                dataSource={dayList?.data?.toolDayVoList}
                pagination={false}
                loading={dayLoading}
                columns={[
                  {
                    title: "名称",
                    dataIndex: "name"
                  },
                  {
                    title: "领用数量",
                    dataIndex: "useNum"
                  },
                  {
                    title: "归还数量",
                    dataIndex: "backNum"
                  },
                  {
                    title: "备注",
                    dataIndex: "remark"
                  }
                ]}
              />
            </List>
          </div>
        ) : (
          /* 月报 */
          <div>
            <List header={<div>一、作业概况</div>}>
              <List.Item>
                <Typography.Text>作业月份：{monthList?.data?.workMonth || "无"}</Typography.Text>
                <Typography.Text>作业次数：{monthList?.data?.workNum || "无"}</Typography.Text>
                <Typography.Text>投入人力：{monthList?.data?.personNum || "无"}</Typography.Text>
              </List.Item>
            </List>

            <List header={<div>二、作业人员情况</div>}>
              <Table
                rowKey={key => key.id}
                dataSource={monthList?.data?.personMonthVoList}
                pagination={false}
                loading={monthLoading}
                columns={[
                  {
                    title: "姓名",
                    dataIndex: "name"
                  },
                  {
                    title: "当月工作日",
                    dataIndex: "workDay"
                  },
                  {
                    title: "当月下线次数",
                    dataIndex: "offlineNum"
                  },
                  {
                    title: "工时差额",
                    dataIndex: "timeDifference"
                  },
                  {
                    title: "备注",
                    dataIndex: "remark"
                  }
                ]}
              />
            </List>

            <List header={<div>三、工器具使用情况</div>}>
              <Table
                rowKey={key => key.id}
                dataSource={monthList?.data?.toolMonthVoList}
                pagination={false}
                loading={monthLoading}
                columns={[
                  {
                    title: "名称",
                    dataIndex: "name"
                  },
                  {
                    title: "使用次数",
                    dataIndex: "useNum"
                  },
                  {
                    title: "使用率",
                    dataIndex: "useRate"
                  },
                  {
                    title: "备注",
                    dataIndex: "remark"
                  }
                ]}
              />
            </List>
          </div>
        )}
      </Main>
    </>
  );
};
