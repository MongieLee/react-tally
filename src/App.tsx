import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Money from 'views/Money'
import Statistics from 'views/Statistics'
import ReportForm from 'views/ReportForm'
import NoMatch from 'views/NoMatch'

function App () {
  return (
    <Router>
      <Switch>
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
  )
}

export default App
