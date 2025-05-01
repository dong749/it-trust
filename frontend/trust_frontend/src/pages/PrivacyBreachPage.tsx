import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { Pie } from '@ant-design/plots';
import { getPrivacyBreachDistributionUsingGet } from '../services/it-trust/dataVisualizationController';

const { Option } = Select;

const PrivacyBreachPage: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (selectedYear: number) => {
    setLoading(true);
    try {
      const res = await getPrivacyBreachDistributionUsingGet({ year: selectedYear });
      if (res?.data) {
        const chartData = res.data
          .filter((item: any) => item.type && item.count != null)
          .map((item: any) => ({
            type: item.type,
            value: item.count,
          }));
        console.log('✅ 获取数据:', chartData);
        setData(chartData);
      }
    } catch (err) {
      console.error('❌ 获取图表数据失败:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'outer',
      content: ({ type, value }: any) => `${type}: ${value}`,
      style: {
        fill: '#fff',
        fontSize: 12,
      },
    },
    tooltip: {
      fields: ['type', 'value'],
      formatter: (datum: any) => ({
        name: datum.type,
        value: `Total: ${datum.value}`,
      }),
    },
    interactions: [{ type: 'element-active' }],
    legend: {
      position: 'bottom',
      itemName: {
        style: {
          fill: '#ccc',
        },
      },
    },
  };

  return (
    <div style={{ padding: 40, backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 24 }}>
        Privacy Breach Distribution in {year}
      </h2>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Select
          value={year}
          onChange={(value) => setYear(value)}
          style={{ width: 160 }}
        >
          {[2020, 2021, 2022, 2023].map((y) => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </div>

      <Spin spinning={loading}>
        <Pie {...config} />
      </Spin>
    </div>
  );
};

export default PrivacyBreachPage;
