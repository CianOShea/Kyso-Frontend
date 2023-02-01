import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import ReportPage from "../../../components/ReportPage";


export default function Report() {  

  const router = useRouter();
  const reports = useSelector(state => state.data.reports)

  const [currentReport, setCurrentReport] = useState([])
  const [isReadyToShow, setIsReadyToShow] = useState(false)
  
  useEffect(() => {
    let reportToLoad = reports.filter(report => report.self_url.ui == `/reports/${router.query.team_name}/${router.query.report_name}`)
    setCurrentReport(reportToLoad[0]);
    if(reportToLoad[0]){ setIsReadyToShow(true) }    
  }, [router.query])

  if(!isReadyToShow){
    return null
  }

  return (   
    <ReportPage report={currentReport}/>
  )
}
