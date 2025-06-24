import React, { useState } from "react";
import Papa from "papaparse";

const CSVUploader = ({ uploadata}) => {
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setError(""); 

    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Please upload a valid .csv file.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        uploadata(results.data);
      },
    });
  };

  return (
    <div className="mb-b p-4 bg-gray-100 rounded-xl shadow-lg border border-gray-200">
      <label className="block mb-3 text-lg font-semibold text-orange-800">
        Upload Invoice CSV
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-6
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-100 file:text-blue-700
                   hover:file:bg-blue-200
                   focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default CSVUploader;
