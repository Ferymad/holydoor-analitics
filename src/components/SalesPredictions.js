import React from 'react';
import { Line } from 'react-chartjs-2';
import { useFetchPredictions } from '../hooks/useFetchPredictions';

const SalesPredictions = () => {
  const { predictions, loading, error } = useFetchPredictions();

  if (loading) return <div>Loading predictions...</div>;
  if (error) return <div>Error loading predictions: {error.message}</div>;

  const chartData = {
    labels: predictions.daily.map(pred => pred.date),
    datasets: [
      {
        label: 'Minimum Predicted Sales',
        data: predictions.daily.map(pred => pred.minQuantity),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Maximum Predicted Sales',
        data: predictions.daily.map(pred => pred.maxQuantity),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Predictions</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Daily Predictions</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Weekly Prediction</h3>
          <p>Next week: {predictions.weekly[0].minQuantity} - {predictions.weekly[0].maxQuantity} units</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Monthly Prediction</h3>
          <p>Next month: {predictions.monthly[0].minQuantity} - {predictions.monthly[0].maxQuantity} units</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Yearly Prediction</h3>
          <p>This year: {predictions.yearly.minQuantity} - {predictions.yearly.maxQuantity} units</p>
        </div>
      </div>
    </div>
  );
};

export default SalesPredictions;