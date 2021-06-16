import React, { useState, useEffect } from 'react';
import { RadialBar } from '@ant-design/charts';

const PlanWorkPage: React.FC = () => {
  var data = [
    {
      name: '日计划数',
      star: 297,
    },
    {
      name: '周计划数',
      star: 506,
    },
    {
      name: '月计划数',
      star: 805,
    },
    {
      name: '季度计划数',
      star: 1478,
    },
    {
      name: '半年计划数',
      star: 2029,
    },
    {
      name: '年底计划数',
      star: 7100,
    },
  ];
  var config = {
    height: 350,
    data: data,
    xField: 'name',
    yField: 'star',
    radius: 0.8,
    innerRadius: 0.2,
    tooltip: {
      formatter: function formatter(datum: any) {
        return {
          name: 'star数',
          value: datum.star,
        };
      },
    },
  };
  return <RadialBar {...config} />;
};

export default PlanWorkPage;