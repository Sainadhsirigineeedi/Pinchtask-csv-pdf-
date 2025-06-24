import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import CSVUploader from "./components/CSVUploader";
import InvoiceGenerator from "./components/InvoiceGenerator";


function App() {
  const [count, setCount] = useState(0)
  const [invoiceData, setInvoiceData] = useState([]);
  return (
    <>
     <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        CSV to Invoice PDF Generator
      </h1>
      <CSVUploader uploadata={setInvoiceData} />
      {invoiceData.length > 0 && <InvoiceGenerator invoiceData={invoiceData} />}
       
    </div>
    </>
  )
}

export default App
