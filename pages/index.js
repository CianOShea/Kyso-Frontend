import ReportPreview from "../components/ReportPreview"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from '../slices/reportSlices'

export default function Home() {

  const dispatch = useDispatch();
  const reports = useSelector(state => state.data.reports) 
  
  useEffect(() => {
    dispatch(fetchReports());
  },[])

  return (    
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <ReportPreview reports={reports}/>
          </div>
        </div>
      </main>
    </div>
    
  )
}