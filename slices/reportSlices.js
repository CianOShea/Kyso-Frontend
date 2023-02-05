import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  reports: []
}

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action) => {    
      state.reports = action.payload
    },
    editReport: (state, action) => {
      state.reports.map(report => {
        if(report.id == action.payload.report_id){
          report.name = action.payload.name
          report.title = action.payload.title
          report.tags = action.payload.tags
          report.full_name = action.payload.full_name
          report.self_url.api = action.payload.self_url.api
          report.self_url.ui = action.payload.self_url.ui
          report.branches_url.api = action.payload.branches_url.api
          report.branches_url.ui = action.payload.branches_url.ui
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

export const reportsSelector = (state) => state.items;

export default reportSlice.reducer


export function fetchReports() {
  return async (dispatch) => {
    axios.all([
      axios.get("http://localhost:3010/reports"),
      axios.get("http://localhost:3010/social")
    ]).then(axios.spread((reports, social) => {
      reports.data.map((report) => {
        var currentSocial = social.data.filter(socialData => socialData.id == report.id)
        report.number_of_comments = currentSocial[0].number_of_comments
        report.stars = currentSocial[0].stars
        report.views = currentSocial[0].views
        if(currentSocial[0].starred) { report.starred = true } else { report.starred = false }
        
        if(!report.tags){ report.tags = [] }
      })
      dispatch(setReports(reports.data))
    }))
  };
}

