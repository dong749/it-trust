/* eslint-disable react/button-has-type */
import React, { useRef, useState } from 'react';
import { searchDataWithDataLeakedUsingPost } from '../services/it-trust/dataVisualizationController';
import { message, Spin } from 'antd';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DataStatisticsPage: React.FC = () => {
  const [state, setState] = useState('');
  const [leakType, setLeakType] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [stats, setStats] = useState<{ max: number; min: number; avg: number; sum: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const states = [
    'Victoria',
    'New South Wales',
    'Queensland',
    'South Australia',
    'Western Australia',
    'Tasmania',
    'Northern Territory',
    'Australian Capital Territory',
  ];

  const leakTypes = ['Total Personal Leak', 'Card Leak', 'Identity Theft', 'Online Impersonation'];

  const fetchData = async () => {
    if (!state || !leakType) {
      message.warning('Please select both State and Leak Type');
      return;
    }

    setLoading(true);
    try {
      const result = await searchDataWithDataLeakedUsingPost({ state, leakType });

      if (result.code !== 0) {
        message.error(result.message || 'Server Error');
        setHasData(false);
        return;
      }

      const response = result.data;
      const list = response.dataLeakedByStates || [];
      const statistics = response.dataLeakedByStateStatistics;

      if (!list.length) {
        message.info('No data found');
        setHasData(false);
        return;
      }

      setStats({
        max: statistics.max,
        min: statistics.min,
        avg: parseFloat(statistics.average.toFixed(2)),
        sum: statistics.sum,
      });

      setHasData(true);
      setTimeout(() => drawChart(list), 0);
    } catch (error) {
      console.error(error);
      message.error('Request failed');
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  const drawChart = (data: any[]) => {
    if (!canvasRef.current) return;
    if (chartInstance) chartInstance.destroy();

    const statesInData = Array.from(new Set(data.map((item) => item.state)));
    const years = Array.from(new Set(data.map((item) => item.year)));
    const labels = statesInData.length === 1 ? years : statesInData;

    const datasetData =
      statesInData.length === 1
        ? years.map((year) =>
            data.find((d) => d.year === year)?.reports ?? 0
          )
        : statesInData.map((state) =>
            data
              .filter((d) => d.state === state)
              .reduce((sum, cur) => sum + (cur.reports || 0), 0)
          );

    const newChart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Reports',
            data: datasetData,
            backgroundColor: '#4FC3F7',
            borderColor: '#0288D1',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            title: {
              display: true,
              text: statesInData.length === 1 ? 'Year' : 'State',
              color: '#ffffff',
            },
          },
          y: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            title: {
              display: true,
              text: 'Number of Reports',
              color: '#ffffff',
            },
          },
        },
      },
    });

    setChartInstance(newChart);
  };

  return (
    <div className="page-container">
      <style>{`
        .page-container {
          padding: 24px;
          font-family: Arial, sans-serif;
          color: white;
        }
        .page-title {
          font-size: 40px;
          font-weight: 900;
          margin-bottom: 32px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }
        .page-title img {
          width: 48px;
          height: 48px;
        }
        .form-section {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .form-select {
          flex: 1;
          padding: 12px;
          border: 1px solid #ccc;
          font-size: 18px;
          color: #000;
          background-color: #fff;
          border-radius: 4px;
          outline: none;
          min-width: 240px;
        }
        .form-select:focus {
          border-color: #1890ff;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
        .form-button {
          background-color: #1890ff;
          color: white;
          padding: 12px 24px;
          font-size: 18px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .form-button:hover {
          background-color: #1677cc;
        }
        .stat-cards {
          display: flex;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .stat-card {
          flex: 1;
          min-width: 160px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 24px;
          border-radius: 8px;
          text-align: center;
        }
        .stat-card h4 {
          margin: 0 0 12px 0;
          font-size: 18px;
          color: #ccc;
        }
        .stat-card p {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          color: #ffffff;
        }
        .chart-and-description {
          display: flex;
          justify-content: space-between;
          gap: 32px;
          align-items: flex-start;
        }
        .chart-container {
          flex: 2;
        }
        .description-panel {
          flex: 1;
          font-size: 14px;
          line-height: 1.6;
          color: #ccc;
        }
      `}</style>

      <div className="page-title">
        <img src="/DV.svg" alt="Leak Icon" />
        <span>Data Leak Visualization</span>
      </div>

      <div className="form-section">
        <select value={state} onChange={(e) => setState(e.target.value)} className="form-select">
          <option value="">Select State</option>
          {states.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={leakType} onChange={(e) => setLeakType(e.target.value)} className="form-select">
          <option value="">Select Leak Type</option>
          {leakTypes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button onClick={fetchData} disabled={loading} className="form-button">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {stats && (
        <div className="stat-cards">
          <div className="stat-card">
            <h4>Maximum</h4>
            <p>{stats.max}</p>
          </div>
          <div className="stat-card">
            <h4>Minimum</h4>
            <p>{stats.min}</p>
          </div>
          <div className="stat-card">
            <h4>Average</h4>
            <p>{stats.avg}</p>
          </div>
          <div className="stat-card">
            <h4>Total</h4>
            <p>{stats.sum}</p>
          </div>
        </div>
      )}

      <div className="chart-and-description">
        <Spin spinning={loading}>
          <div className="chart-container">
            {hasData && (
              <canvas
                ref={canvasRef}
                width="600"
                height="300"
                style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
              />
            )}
          </div>
        </Spin>

        {hasData && (
          <div className="description-panel">
            <h3 style={{ color: '#ffffff', marginBottom: '12px' }}>What Do the Stats Mean?</h3>
            <ul>
              <li><strong>Maximum</strong>: Highest number of reports in a single year or region.</li>
              <li><strong>Minimum</strong>: Lowest number of reports in the dataset.</li>
              <li><strong>Average</strong>: Mean number of reports across records.</li>
              <li><strong>Total</strong>: Sum of all reported leak events selected.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataStatisticsPage;
