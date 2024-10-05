import React from 'react';
import DataUploadForm from '../components/DataUploadForm';

const UploadPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Upload Sales Data</h1>
      <DataUploadForm />
    </div>
  );
};

export default UploadPage;