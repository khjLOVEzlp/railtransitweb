import styled from "@emotion/styled";
import {useLineList} from "../../../../utils/statistics/taskStatistics";
import {Form, Select} from "antd";
import {Column} from "@ant-design/charts";

export const PersonMind = () => {
  const {data: lineList} = useLineList()

  return (
    <>
      <Header>
        <Form
          layout={"inline"}
        >
          <Form.Item
            name={"subwayId"}
            initialValue={83}
          >
            <Select
              style={{width: 120}}
              placeholder={"地铁路线"}
              showSearch
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                lineList?.data.map((item: any) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name={"time"}
            initialValue={3}
          >
            <Select
              placeholder={"时间"}
              style={{width: 120}}
            >
              <Select.Option value={1}>本日</Select.Option>
              <Select.Option value={2}>本周</Select.Option>
              <Select.Option value={3}>本月</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Header>

      <Main>
        <DemoColumn/>
        <DemoColumn/>
        <DemoColumn/>
      </Main>
    </>
  )
}

const DemoColumn = () => {
  var data = [
    {
      type: '防漏带',
      sales: 38,
    },
    {
      type: '防漏点',
      sales: 52,
    },
    {
      type: '防遗漏',
      sales: 61,
    },
    {
      type: '防疫情',
      sales: 145,
    },
    {
      type: '防酒精',
      sales: 48,
    },
    {
      type: '分离告警',
      sales: 38,
    },
    {
      type: '离线告警',
      sales: 38,
    },
    {
      type: '过时告警',
      sales: 38,
    },
    {
      type: '低电告警',
      sales: 38,
    },
    {
      type: '防血压',
      sales: 38,
    },
    {
      type: '防遗留',
      sales: 38,
    },
  ];
  var config = {
    data: data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {alias: '类别'},
      sales: {alias: '销售额'},
    },
  };
  // @ts-ignore
  return <Column {...config} />;
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
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  padding: 1.5rem 1.5rem;
  display: flex;
  > * {
    flex: 1;
  }
`