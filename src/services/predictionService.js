import { supabase } from '../supabaseClient';
import { predictSales, aggregatePredictions } from '../utils/predictionLogic';

export const getPredictions = async () => {
  try {
    // Fetch historical data from Supabase
    const { data, error } = await supabase
      .from('sales')
      .select('date, quantity')
      .order('date', { ascending: true });

    if (error) throw error;

    // Generate predictions for the next 365 days
    const dailyPredictions = predictSales(data, 365);

    // Aggregate predictions
    const aggregatedPredictions = aggregatePredictions(dailyPredictions);

    return {
      daily: dailyPredictions,
      ...aggregatedPredictions
    };
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};