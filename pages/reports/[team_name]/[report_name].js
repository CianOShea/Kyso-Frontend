import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import ReportPage from "../../../components/ReportPage";
import axios from "axios";
import { Spinner, toaster } from "evergreen-ui";

export default function Report() {  

  const router = useRouter();

  const [currentReport, setCurrentReport] = useState([])
  const [isReadyToShow, setIsReadyToShow] = useState(false)
  
  useEffect(() => {
    if(router.query.report_name) { getCurrentReport() }   
  }, [router.query.team_name, router.query.report_name])


  const getCurrentReport = async() => {
    const response = await axios.get(`http://localhost:3010/reports/`, { params : { full_name: `${router.query.team_name}/${router.query.report_name}` } }).catch(function(error) { 
      toaster.warning('An error occured retrieving report.') 
      router.push('/')
    })    
    if(response.data.length > 0){ 
      setCurrentReport(response.data[0]); setIsReadyToShow(true) 
    } else { 
        toaster.warning('Report does not exist.') 
        router.push('/')
     }
  }

  if(!isReadyToShow){
    return (
      <div className="flex justify-center items-center">
        <Spinner/>
      </div>
    )
  }

  return (   
    <ReportPage report={currentReport}/>
  )
}
