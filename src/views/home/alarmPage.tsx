import { Radar } from '@ant-design/charts';

const Page = ({ data }: { data: any }) => {
  const config = {
    width: 200,
    height: 200,
    data: data,
    xField: 'name',
    yField: 'star',
    meta: {
      star: {
        alias: '数量',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {},
    area: {},
  };
  return <Radar {...config} />;
};

export default Page;