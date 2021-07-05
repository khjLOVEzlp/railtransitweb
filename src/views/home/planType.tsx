/*import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import { Modal } from 'antd';

const PlanType: React.FC = () => {
  const [visible, setVisible] = useState(false)
  var data = [
    {
      type: '日计划',
      value: 297,
    },
    {
      type: '周计划',
      value: 506,
    },
    {
      type: '月计划',
      value: 805,
    },
    {
      type: '季度计划',
      value: 1478,
    },
    {
      type: '半年计划',
      value: 2029,
    },
    {
      type: '年底计划',
      value: 7100,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    height: 300,
    width: 300,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
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

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Pie {...config} onReady={(plot: any) => {
        plot.on('plot:click', (evt: any) => {
          console.log(plot.options.data);

          const { x, y } = evt;
          const { xField } = plot.options;
          const tooltipData = plot.chart.getTooltipItems({ x, y });
          console.log(tooltipData);
          setVisible(true)
        });
      }} />

      <OperModal visible={visible} onCancel={onCancel} />
    </>
  )
};

const OperModal = ({ visible, onCancel }: { visible: boolean, onCancel: () => void }) => {
  return (
    <Modal
      footer={false}
      visible={visible}
      onCancel={onCancel}
      title={"计划统计"}
    >

    </Modal>
  )
}

export default PlanType;*/

import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { Modal } from 'antd';

const PlanType: React.FC = () => {
  const [visible, setVisible] = useState(false)

  var data = [
    {
      type: '日计划',
      sales: 38,
    },
    {
      type: '周计划',
      sales: 52,
    },
    {
      type: '月计划',
      sales: 61,
    },
    {
      type: '季度计划',
      sales: 15,
    },
    {
      type: '半年计划',
      sales: 48,
    },
    {
      type: '年计划',
      sales: 38,
    },
  ];
  var config = {
    data: data,
    height: 350,
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
      type: { alias: '类别' },
      sales: { alias: '销售额' },
    },
  };

  const onCancel = () => {
    setVisible(false)
  }

  return <>
    {/*@ts-ignore*/}
    <Column {...config} onReady={(plot: any) => {
      plot.on('plot:click', (evt: any) => {
        console.log(plot.options.data);

        const { x, y } = evt;
        const tooltipData = plot.chart.getTooltipItems({ x, y });
        console.log(tooltipData);
        setVisible(true)
      })
    }}/>
    <OperModal visible={visible} onCancel={onCancel} />
  </>
};

const OperModal = ({ visible, onCancel }: { visible: boolean, onCancel: () => void }) => {
  return (
    <Modal
      footer={false}
      visible={visible}
      onCancel={onCancel}
      title={"计划统计"}
    >

    </Modal>
  )
}

export default PlanType;