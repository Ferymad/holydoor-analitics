import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useFetchSalesData = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data, error } = await supabase
          .from('sales')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        setSalesData(data || []);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setError('Error fetching sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return { salesData, loading, error };
};