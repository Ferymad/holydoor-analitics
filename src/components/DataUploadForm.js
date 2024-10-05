import React, { useState } from 'react';
import { useUploadFile } from '../hooks/useUploadFile';

export default function DataUploadForm() {
  const [file, setFile] = useState(null);
  const { uploadFile, loading, error } = useUploadFile();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await uploadFile(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Sales Data</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Choose CSV file
          </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </form>
    </div>
  );
}