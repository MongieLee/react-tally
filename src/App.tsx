import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Money from 'views/Money'
import Statistics from 'views/Statistics'
import ReportForm from 'views/ReportForm'
import NoMatch from 'views/NoMatch'
import { TagEditw } from 'views/TagEditCopy'
import { EditTag } from 'views/EditTag'

const AppWrapper = styled.div`
  color: #333;
`
function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path='/labels'>
            <TagEditw />
          </Route>
          <Route path='/statistics/details/:day/:id'>
            <EditTag />
          </Route>
          <Route exact path='/statistics'>
            <Statistics />
          </Route>
          <Route exact path='/money'>
            <Money />
          </Route>
          <Route exact path='/reportForm'>
            <ReportForm />
          </Route>
          <Redirect exact from='/' to='/statistics' />
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  )
}

export default App
