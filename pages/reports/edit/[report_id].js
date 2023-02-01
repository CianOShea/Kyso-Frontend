import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import ReportEdit from "../../../components/ReportEdit";


export default function Report() {

  const router = useRouter();
  const reportID = router.query.report_id
  const reports = useSelector(state => state.data.reports)

  const [currentReport, setCurrentReport] = useState([])
  
  
  useEffect(() => { 
    // check Auth
    let reportToEdit = reports.filter(report => report.id == reportID)
    setCurrentReport(reportToEdit[0]) 

  }, [reportID])  

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Report</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <ReportEdit report={currentReport}/>
          </div>
        </div>
      </main>
    </div>
  )
}
