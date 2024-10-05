import { parse, format } from 'date-fns';

// Function to calculate moving average
const calculateMovingAverage = (data, windowSize) => {
  const result = [];
  for (let i = windowSize - 1; i < data.length; i++) {
    const window = data.slice(i - windowSize + 1, i + 1);
    const sum = window.reduce((acc, val) => acc + val, 0);
    result.push(sum / windowSize);
  }
  return result;
};

// Function to predict sales
export const predictSales = (historicalData, predictionPeriod) => {
  // Sort data by date
  const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Extract quantities
  const quantities = sortedData.map(item => item.quantity);

  // Calculate moving average (using 7-day window for this example)
  const movingAverage = calculateMovingAverage(quantities, 7);

  // Use the last moving average value as the prediction base
  const basePrediction = movingAverage[movingAverage.length - 1];

  // Generate predictions
  const predictions = [];
  const lastDate = new Date(sortedData[sortedData.length - 1].date);

  for (let i = 1; i <= predictionPeriod; i++) {
    const predictionDate = new Date(lastDate);
    predictionDate.setDate(predictionDate.getDate() + i);

    // Add some randomness to create a range (±10% in this example)
    const lowerBound = Math.round(basePrediction * 0.9);
    const upperBound = Math.round(basePrediction * 1.1);

    predictions.push({
      date: format(predictionDate, 'yyyy-MM-dd'),
      minQuantity: lowerBound,
      maxQuantity: upperBound,
    });
  }

  return predictions;
};

// Function to aggregate predictions by week, month, and year
export const aggregatePredictions = (predictions) => {
  const weekly = [];
  const monthly = [];
  let yearly = { minQuantity: 0, maxQuantity: 0 };

  let weekSum = { minQuantity: 0, maxQuantity: 0 };
  let monthSum = { minQuantity: 0, maxQuantity: 0 };

  predictions.forEach((pred, index) => {
    const date = parse(pred.date, 'yyyy-MM-dd', new Date());
    
    // Weekly aggregation
    weekSum.minQuantity += pred.minQuantity;
    weekSum.maxQuantity += pred.maxQuantity;
    if ((index + 1) % 7 === 0 || index === predictions.length - 1) {
      weekly.push({ ...weekSum, date: pred.date });
      weekSum = { minQuantity: 0, maxQuantity: 0 };
    }

    // Monthly aggregation
    monthSum.minQuantity += pred.minQuantity;
    monthSum.maxQuantity += pred.maxQuantity;
    if (date.getDate() === 1 || index === predictions.length - 1) {
      monthly.push({ ...monthSum, date: pred.date });
      monthSum = { minQuantity: 0, maxQuantity: 0 };
    }

    // Yearly aggregation
    yearly.minQuantity += pred.minQuantity;
    yearly.maxQuantity += pred.maxQuantity;
  });

  return { weekly, monthly, yearly };
};