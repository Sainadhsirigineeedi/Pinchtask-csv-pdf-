import React, { useState } from "react";
import generatePDF from "./PdfDesign";
import { saveAs } from "file-saver";

const InvoiceGenerator = ({ invoiceData }) => {
  const [downloadingIndexes, setDownloadingIndexes] = useState([]);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    for (let idx = 0; idx < invoiceData.length; idx++) {
      const doc = await generatePDF(invoiceData[idx], idx);
      const blob = doc.output("blob");
      saveAs(blob, `invoice of ${invoiceData[idx].Name}.pdf`);
    }
    setDownloadingAll(false);
  };

  const handleSingleDownload = async (index) => {
    setDownloadingIndexes((prev) => [...prev, index]);
    const doc = await generatePDF(invoiceData[index], index);
    doc.save(`invoice of ${invoiceData[index].Name}.pdf`);
    setDownloadingIndexes((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-100 shadow-2xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Invoice Dashboard</h2>

      <button
        onClick={handleDownloadAll}
        disabled={downloadingAll}
        className={`mb-6 px-6 py-3 rounded-lg shadow-md transition duration-300 ${
          downloadingAll
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
        }`}
      >
        {downloadingAll ? "Downloading..." : "Download All Invoices"}
      </button>

      <ul className="space-y-4">
        {invoiceData.map((row, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
          >
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Invoice of Customer ID: {row.Customer_ID}
              </p>
              <p className="text-sm text-gray-500">Name: {row.Name}</p>
            </div>
            <button
              onClick={() => handleSingleDownload(idx)}
              disabled={downloadingIndexes.includes(idx)}
              className={`px-4 py-2 rounded-md transition duration-200 ${
                downloadingIndexes.includes(idx)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-700 text-green-700 hover:bg-gray-800"
              }`}
            >
              {downloadingIndexes.includes(idx) ? "Downloading..." : "Download"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceGenerator;
