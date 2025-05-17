import React, { useEffect, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import { Chart, registerables } from 'chart.js';
import { getPrivacyBreachDistributionUsingGet } from '../services/it-trust/dataVisualizationController';

Chart.register(...registerables);
const { Option } = Select;

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316',
  '#6366f1', '#22c55e',
];

const PrivacyBreachPage: React.FC = () => {
  const [year, setYear] = useState<number>(2022);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const fetchAndRenderData = async (selectedYear: number) => {
    setLoading(true);
    try {
      const res = await getPrivacyBreachDistributionUsingGet({ year: selectedYear });
      if (res?.data) {
        const filteredData = res.data.filter((item: any) => item.type && item.count != null);
        const newLabels = filteredData.map((item: any) => item.type);
        const newValues = filteredData.map((item: any) => item.count);
        setLabels(newLabels);
        setValues(newValues);
        renderChart(newLabels, newValues);
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
            backgroundColor: COLORS,
            borderColor: '#0f172a',
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false }, // 自定义图例，不用默认的
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
          {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
            <Option key={y} value={y}>{y}</Option>
          ))}
        </Select>
      </div>

      <Spin spinning={loading}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
          {/* 左边图表 */}
          <div style={{ width: 400 }}>
            <canvas ref={chartRef} />
          </div>

          {/* 右边图例 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {labels.map((label, index) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span style={{ fontSize: 14 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default PrivacyBreachPage;
