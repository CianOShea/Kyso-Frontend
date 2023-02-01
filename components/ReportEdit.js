import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { editReport } from '../slices/reportSlices'
import { TagInput, TextInput, Textarea  } from "evergreen-ui";

export default function ReportEdit({report}) {
  const router = useRouter();
  const dispatch = useDispatch()

  const [currentReportName, setCurrentReportName] = useState('')
  const [currentReportTitle, setCurrentReportTitle] = useState('')
  const [currentTags, setCurrentTags] = useState([])

  useEffect(() => {
    if(report){
      setCurrentReportName(report.name || '')
      setCurrentReportTitle(report.title || '')
      setCurrentTags(report.tags || [])
    }
    
  }, [report])


  const editCurrentReport = () => {
    dispatch(editReport({report_id: report.id, report_name: currentReportName, report_title: currentReportTitle, report_tags: currentTags}))
    router.push('/')
  }


  return (
    <div>
      {
        report ?
        <div className="flex flex-col m-12 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex flex-col mb-10">
            <label for="reportName" className="block mb-2 text-sm font-medium text-gray-900 ">Name:</label>
            <input name="reportName" value={currentReportName} onChange={(e) => setCurrentReportName(e.target.value)} type="text" id="reportName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></input>
          </div>

          <div className="flex flex-col mb-10">
            <label for="reportTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Name:</label>
            <textarea name="reportTitle" value={currentReportTitle} onChange={(e) => setCurrentReportTitle(e.target.value)} type="text" id="reportTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ></textarea>
          </div>
          
          <div className="flex flex-col mb-10">
            <span className="text-sm font-semibold tracking-tight text-gray-900">Tags:</span>
            <TagInput
              inputProps={{ placeholder: 'Add tags...' }}
              values={currentTags}
              onChange={(values) => {
                setCurrentTags(values)
              }}
            />
          </div>          
          
          <div className="flex flex-row">
            <Link href="/" className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Cancel</Link>
            <button onClick={() => editCurrentReport()} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Edit</button>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}
