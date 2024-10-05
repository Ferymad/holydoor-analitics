import { useState } from 'react';
import { uploadSalesData } from '../services/uploadService';

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    setLoading(true);
    setError(null);
    try {
      await uploadSalesData(file);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};