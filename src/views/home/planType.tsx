import React from 'react';
import { Pie } from '@ant-design/charts';

const PlanType: React.FC = () => {
  var data = [
    {
      type: '日计划数',
      value: 297,
    },
    {
      type: '周计划数',
      value: 506,
    },
    {
      type: '月计划数',
      value: 805,
    },
    {
      type: '季度计划数',
      value: 1478,
    },
    {
      type: '半年计划数',
      value: 2029,
    },
    {
      type: '年底计划数',
      value: 7100,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    height: 100,
    label: {
      type: 'inner',
      offset: '-30%',

      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return <Pie {...config} />;
};

export default PlanType;