import { createSlice } from '@reduxjs/toolkit'
import jsonData from '../pages/api/json-server.json'
import JSZip from 'jszip';

jsonData.reports.map((report) => {
  var currentSocial = jsonData.social.filter(socialData => socialData.id == report.id)
  report.number_of_comments = currentSocial[0].number_of_comments
  report.stars = currentSocial[0].stars
  report.views = currentSocial[0].views
  report.starred = false
  if(!report.tags){ report.tags = [] }
})


export const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: jsonData.reports
  },
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload.reports
    },
    editReport: (state, action) => {
      state.reports.map(report => {
        if(report.id == action.payload.report_id){
          report.name = action.payload.report_name
          report.title = action.payload.report_title
          report.tags = action.payload.report_tags
        }        
      })
      state.reports = state.reports
    },
    incrementReportStars: (state, action) => {
      state.reports.map(report => {
        if(report.id == action.payload){
          report.stars += 1
          report.starred = true
        }        
      })
      state.reports = state.reports
    },
    decrementReportStars: (state, action) => {
      state.reports.map(report => {
        if(report.id == action.payload){
          report.stars -= 1
          report.starred = false
        }        
      })
      state.reports = state.reports
    },
    incrementReportViews: (state, action) => {
      state.reports.map(report => {
        if(report.id == action.payload){
          report.views += 1
        }        
      })
      state.reports = state.reports
    }
  }
})

// Action creators are generated for each case reducer function
export const { editReport, incrementReportStars, decrementReportStars, incrementReportViews, setReports } = reportSlice.actions

export default reportSlice.reducer