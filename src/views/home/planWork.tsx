import {useState} from 'react';
import {Line} from '@ant-design/charts';

const PlanWorkPage: React.FC = () => {
  const [data] = useState([
    {
      "name": "日计划",
      "year": "2000",
      "gdp": 1111346869605.24
    },
    {
      "name": "日计划",
      "year": "2001",
      "gdp": 1211346869605.24
    },
    {
      "name": "日计划",
      "year": "2002",
      "gdp": 1311346869605.24
    },
    {
      "name": "周计划",
      "year": "2000",
      "gdp": 1411346869605.24
    },
    {
      "name": "周计划",
      "year": "2001",
      "gdp": 11346869605.24
    },
    {
      "name": "周计划",
      "year": "2002",
      "gdp": 611346869605.24
    },
    {
      "name": "月计划",
      "year": "2000",
      "gdp": 711346869605.24
    },
    {
      "name": "月计划",
      "year": "2001",
      "gdp": 811346869605.24
    },
    {
      "name": "月计划",
      "year": "2002",
      "gdp": 911346869605.24
    },
  ]);

  var config = {
    data: data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    height: 350,
    yAxis: {
      label: {
        formatter: function formatter(v: any) {
          return ''.concat((v / 1000000000).toFixed(1), ' B');
        },
      },
    },
    legend: {position: 'top'},
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  // @ts-ignore
  return <Line {...config} />;
};

export default PlanWorkPage;