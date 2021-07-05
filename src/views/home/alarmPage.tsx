import { Radar } from '@ant-design/charts';
import { Modal } from 'antd';
import { useState } from 'react';

const Page = ({ data }: { data: any }) => {
  const [visible, setVisible] = useState(false)

  const onCancel = () => {
    setVisible(false)
  }

  const config = {
    data: data,
    width: 400,
    height: 400,
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
  return (
    <>
      <Radar {...config}
        onReady={(plot: any) => {
          plot.on('plot:click', (evt: any) => {
            const { x, y } = evt;
            const { xField } = plot.options;
            const tooltipData = plot.chart.getTooltipItems({ x, y });
            console.log(tooltipData);
            setVisible(true)
          });
        }}

      /><OperModal visible={visible} onCancel={onCancel} />
    </>
  )
};

export default Page;

const OperModal = ({ visible, onCancel }: { visible: boolean, onCancel: () => void }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={"告警统计"}
    >

    </Modal>
  )
}