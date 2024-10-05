import { useState, useEffect } from 'react';
import { getPredictions } from '../services/predictionService';

export const useFetchPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getPredictions();
        setPredictions(data || []);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError('Error fetching predictions');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return { predictions, loading, error };
};