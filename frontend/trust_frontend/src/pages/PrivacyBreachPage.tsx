import React, { useEffect, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import { Chart, registerables } from 'chart.js';
import { getPrivacyBreachDistributionUsingGet } from '../services/it-trust/dataVisualizationController';

Chart.register(...registerables);
const { Option } = Select;

const PrivacyBreachPage: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const fetchAndRenderData = async (selectedYear: number) => {
    setLoading(true);
    try {
      const res = await getPrivacyBreachDistributionUsingGet({ year: selectedYear });
      if (res?.data) {
        const filteredData = res.data.filter((item: any) => item.type && item.count != null);
        const labels = filteredData.map((item: any) => item.type);
        const values = filteredData.map((item: any) => item.count);

        renderChart(labels, values);
      }
    } catch (err) {
      console.error('图表数据获取失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (labels: string[], values: number[]) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: 'Report Count',
            data: values,
            backgroundColor: [
              '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
              '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
              '#6366f1', '#22c55e',
            ],
            borderColor: '#0f172a',
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    fetchAndRenderData(year);
  }, [year]);

  return (
    <div style={{ padding: 40, backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 24 }}>
        Privacy Breach Distribution in {year}
      </h2>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Select value={year} onChange={setYear} style={{ width: 160 }}>
          {[2020, 2021, 2022, 2023].map((y) => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </div>

      <Spin spinning={loading}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <canvas ref={chartRef} />
        </div>
      </Spin>
    </div>
  );
};

export default PrivacyBreachPage;
