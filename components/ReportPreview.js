import { useEffect, useState } from "react"
import Link from "next/link"
import format from "date-fns/format"
import { FaEye, FaCommentDots, FaShareAlt, FaRegEdit } from 'react-icons/fa'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'
import { Badge, toaster } from 'evergreen-ui'
import { useDispatch } from 'react-redux'
import { incrementReportStars, decrementReportStars } from '../slices/reportSlices'

export default function ReportPreview({reports}) {

  const dispatch = useDispatch()  

  const [shownReports, setShownReports] = useState([])
  const [needsReset, setNeedsReset] = useState(false)

  const storageLocation = "https://d1kser01wv8mbw.cloudfront.net/"

  const copyLink = (report) => {
    navigator.clipboard.writeText(`http://localhost:3000${report.self_url.ui}`)
    toaster.success('Copied')
  }

  useEffect(() => {
    setShownReports(reports)
  }, [reports])

  const reorderReports = ({ report_id, tag }) => {
    console.log(report_id);
    let arrayForSorting = [...shownReports]
    const reorderedReports = arrayForSorting.sort((a, b) => {
      const tagInA = a.tags.includes(tag);
      const tagInB = b.tags.includes(tag);

      console.log(tagInA);

      if (tagInA && !tagInB) {
        return -1;
      } else if (!tagInA && tagInB) {
        return 1;
      } else {
        return 0;
      }      
    });  
    setShownReports(reorderedReports)
  }

  if(!shownReports){
    return null
  }

  return (
    <div>
      {
        shownReports.map((report) => (
          <ul key={report.id} report={report}>
            <article className="flex sm:flex-row flex-col m-12 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
              <img className="sm:w-1/3 sm:pr-4 w-full " src={report.preview ? storageLocation + report.preview : report.owner.avatar_url} alt={report.owner.name} />
              <div className="flex flex-col justify-between sm:w-2/3 w-full">
                <div className="flex justify-between w-full items-center mb-5 text-gray-500">                  
                    <span className="text-sm">{format(new Date(report.created_at), 'MMMM dd, yyyy')}</span>
                    <div className="flex flex-row">
                      <Link href={{ pathname: `/reports/edit/${report.id}` }} className='cursor-pointer rounded-full p-2 hover:bg-slate-100' >
                        <FaRegEdit/>
                      </Link>
                      <div className='cursor-pointer rounded-full p-2 hover:bg-slate-100' onClick={() => copyLink(report)}>
                        <FaShareAlt />
                      </div>
                    </div>
                    
                </div>
                <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 "><Link href={{ pathname: `${report.self_url.ui}` }}>{report.name.toUpperCase()}</Link></h2>
                <p className="mb-5 font-light text-gray-500 ">{report.title}</p>
                <div className="flex flex-row flex-wrap">
                  {
                    report.tags ?

                    report.tags.map((tag, index) => (
                      <ul key={index} tag={tag}>
                        <Badge onClick={() => reorderReports({ report_id: report.id, tag: tag})} color='blue' marginRight={8}>{tag}</Badge>
                      </ul>
                    ))
                    : 
                    null                    
                  }
                </div>
                <div className="flex sm:flex-row flex-col justify-between w-full">
                  <div className="flex flex-row items-center my-2">
                    <img className="w-7 h-7 rounded-full" src={report.owner.avatar_url} alt={report.owner.name} />
                    <span className="font-medium ">
                        {report.owner.name}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row p-2">                          
                      <div className="flex flex-row justify-center items-center text-sky-600 mr-2">
                        <FaCommentDots className="mr-2"/>
                        {report.number_of_comments}
                      </div>
                      <div className="flex flex-row justify-center items-center text-green-600 mr-2">
                        <FaEye className="mr-2"/>
                        {report.views}
                      </div>
                      <div onClick={() => {report.starred ? dispatch(decrementReportStars(report.id)) : dispatch(incrementReportStars(report.id))}} className="cursor-pointer rounded-full p-2 flex flex-row justify-center items-center text-amber-600 hover:bg-amber-100">
                        {report.starred ? <AiTwotoneStar className="mr-2"/>  :  <AiOutlineStar className="mr-2"/>  }                        
                        {report.stars}
                      </div>
                    </div>

                    <Link href={{ pathname: `${report.self_url.ui}` }} className="inline-flex items-center font-medium text-primary-600  hover:underline">
                      <span className="hidden md:flex">Read more</span>
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>  
                  </div>                    
                    
                </div>
              </div>
            </article> 
          </ul>
        ))
      }
    </div>
  )
}
