import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from 'next/router';
import { Spinner, TagInput, toaster  } from "evergreen-ui";
import axios from "axios";
import { editReport } from "../slices/reportSlices";
import { useDispatch } from "react-redux";

export default function ReportEdit({report}) {
  
  const router = useRouter();
  const dispatch = useDispatch()

  const [currentReport, setCurrentReport] = useState({ name: '', title: '', tags: [] })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if(report){
      setCurrentReport(report)
      setIsLoading(false)
    }
  }, [report])


  const editCurrentReport = async () => {
    try {
      setIsLoading(true)      
      const params = {
        report_id: currentReport.id,
        name: currentReport.name,
        title: currentReport.title,
        tags: currentReport.tags,
        full_name: `${currentReport.owner.name}/${currentReport.name}`,
        self_url: { 
          api: `${currentReport.self_url.api.split('/reports'[0])}/${currentReport.owner.name}/${currentReport.name}`,
          ui: `/reports/${currentReport.owner.name}/${currentReport.name}` 
        },
        branches_url: {
          api: `${currentReport.branches_url.api.split('/reports', 0)}/${currentReport.owner.name}/${currentReport.name}/branches`,
          ui: `/reports/${currentReport.owner.name}/${currentReport.name}/branches`
        }
      }
      dispatch(editReport(params))
      
      await axios.patch(`http://localhost:3010/reports/${report.id}`, params)      
      toaster.success('Report successfully edited.')
      router.push('/')
    } catch (error) {
      toaster.danger('An error occured while editing the report. Please try again.')      
      console.error(error);
    }
    
  }


  return (
    <div>
      {
        currentReport ?
        <div className="flex flex-col m-12 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col mb-10">
            <label htmlFor="reportName" className="block mb-2 text-sm font-medium text-gray-900 ">Name:</label>
            <input name="reportName" value={currentReport.name} onChange={(e) => setCurrentReport({...currentReport, name: e.target.value})} type="text" id="reportName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></input>
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="reportTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Name:</label>
            <textarea name="reportTitle" value={currentReport.title} onChange={(e) => setCurrentReport({...currentReport, title: e.target.value})} type="text" id="reportTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ></textarea>
          </div>
          
          <div className="flex flex-col mb-10">
            <span className="text-sm font-semibold tracking-tight text-gray-900">Tags:</span>
            <TagInput
              inputProps={{ placeholder: 'Add tags...' }}
              values={currentReport.tags}
              onChange={(values) => {
                setCurrentReport({...currentReport, tags: values})
              }}
            />
          </div>          
          
          <div>
            {
              isLoading ?
                <div className="flex justify-center">
                  <Spinner/>
                </div>
              :    
                <div className="flex flex-row">       
                  <Link href="/" className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Cancel</Link>
                  <button onClick={() => editCurrentReport()} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Edit</button>
                </div> 
            }
                </div>
        </div>
        :
        null
      }
    </div>
  )
}
