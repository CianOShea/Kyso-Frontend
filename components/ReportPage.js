import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { incrementReportViews } from '../slices/reportSlices'
import axios from 'axios'
import { Spinner } from 'evergreen-ui';

export default function ReportPage({report}) {

  const dispatch = useDispatch()

  const [currentReport, setCurrentReport] = useState({ title: '' })
  const [isLoading, setIsLoading] = useState(true)

  var updatedViewCount = false

  const incrementViews = async() => {        
    await axios.get(`http://localhost:3010/social/`, { params: { id: report.id } }).then(response => {
        let newViewQuantity = response.data[0].views + 1 
        axios.patch(`http://localhost:3010/social/${report.id}`, { views: newViewQuantity })
      })        
  }
  
  useEffect(() => {
    if(report){
      setCurrentReport(report);
      setIsLoading(false)

      if(!updatedViewCount){
        dispatch(incrementReportViews(report.id))
        incrementViews()
        updatedViewCount = true
      }
    }
  }, [report])

  if(isLoading){
    return (
      <div className="flex justify-center">
        <Spinner/>
      </div>
    )
  }

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 p-5">{currentReport.name}</h1>
          <p className="text-md tracking-tight text-gray-900 p-5">{currentReport.title}</p>
        </div>

      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <p className='p-5'>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Luctus ligula fringilla ac purus hendrerit ipsum. Natoque arcu tincidunt sit eget. Convallis cras nunc, tellus a cubilia eros. Nam molestie nibh dui eu fringilla. Sociosqu ornare elementum posuere erat curae quisque. Turpis massa maximus pharetra curae mauris hac. Adipiscing erat erat diam litora suscipit. Quam torquent consequat nisi mauris congue cubilia.
            </p>
            <p className='p-5'>
              Varius auctor fusce habitant phasellus. Vel eu eros quis platea. Quam cursus himenaeos torquent nisl purus ultricies. Commodo scelerisque lacus nec dictumst. Tincidunt bibendum ultricies quis aenean quam parturient congue? Ex himenaeos lacus ut pulvinar lacus. Phasellus metus curae ut facilisi et porta. Eros lacinia penatibus mi urna proin.
            </p>
            <p className='p-5'>
              Integer nam platea velit mus. Non facilisi dignissim mattis eget lacus. Integer ornare condimentum, donec pharetra consequat volutpat. Tristique suspendisse per posuere. Iaculis aenean nisi fermentum imperdiet himenaeos ad. Ipsum placerat etiam lorem varius. Potenti eleifend maximus habitasse eros ornare suscipit. Vivamus montes et mollis. Sed mauris dis ullamcorper adipiscing enim. Luctus quisque leo torquent curae odio non nostra.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
