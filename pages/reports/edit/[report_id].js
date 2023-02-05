import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import ReportEdit from "../../../components/ReportEdit";
import axios from "axios";
import { toaster } from "evergreen-ui";


export default function Report() {

  const router = useRouter();
  const report_id = router.query.report_id

  const [currentReport, setCurrentReport] = useState({ name: '', title: '', tags: [] })  
  
  useEffect(() => { 
    // check Auth
    if(report_id){
      getCurrentReport()
    }
  }, [report_id])  

  const getCurrentReport = async() => {
    const response = await axios.get(`http://localhost:3010/reports/${report_id}`).catch(function(error) { 
      toaster.warning('An error occured retrieving report.') 
      router.push('/')
    })
    if(response){ setCurrentReport(response.data) }
  }


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
