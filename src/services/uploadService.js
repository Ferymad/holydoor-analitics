import { supabase } from '../supabaseClient';
import Papa from 'papaparse';

export const uploadSalesData = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const { data, errors } = results;

          if (errors.length > 0) {
            throw new Error('Error parsing CSV file');
          }

          // Validate data structure
          const isValidData = data.every(row => 
            row.date && row.product_type && row.quantity &&
            !isNaN(new Date(row.date).getTime()) &&
            !isNaN(parseInt(row.quantity))
          );

          if (!isValidData) {
            throw new Error('Invalid data structure in CSV');
          }

          // Format data for insertion
          const formattedData = data.map(row => ({
            date: new Date(row.date).toISOString().split('T')[0],
            product_type: row.product_type,
            quantity: parseInt(row.quantity)
          }));

          // Insert data into Supabase
          const { error } = await supabase
            .from('sales')
            .insert(formattedData);

          if (error) throw error;

          resolve('Data uploaded successfully');
        } catch (error) {
          console.error('Error uploading data:', error);
          reject(error);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        reject(new Error(`Error parsing CSV: ${error.message}`));
      }
    });
  });
};