import React from 'react';
import { useFetchSalesData } from '../hooks/useFetchSalesData';
import { useFetchPredictions } from '../hooks/useFetchPredictions';
import Chart from './Chart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { salesData, loading: salesLoading, error: salesError } = useFetchSalesData();
  const { predictions, loading: predictionsLoading, error: predictionsError } = useFetchPredictions();

  if (salesLoading || predictionsLoading) return <div>Loading...</div>;

  if (salesError || predictionsError) {
    console.error('Sales Error:', salesError);
    console.error('Predictions Error:', predictionsError);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!salesData || salesData.length === 0 || !predictions || predictions.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>No data available. Please upload some sales data first.</p>
        <Link to="/upload" className="text-blue-500 hover:text-blue-700">
          Go to Upload Page
        </Link>
      </div>
    );
  }

  // Ensure salesData and predictions have the same length
  const minLength = Math.min(salesData.length, predictions.length);
  const labels = salesData.slice(0, minLength).map(item => item.date);

  const datasets = [
    {
      label: 'Actual Sales',
      data: salesData.slice(0, minLength).map(item => item.quantity),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Predicted Sales',
      data: predictions.slice(0, minLength).map(item => item.quantity),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Chart labels={labels} datasets={datasets} />
    </div>
  );
};

export default Dashboard;