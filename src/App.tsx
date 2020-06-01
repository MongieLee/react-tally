import React from 'react'
import styled from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Nav from './components/Nav'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const NoMatch = styled.div`
  width: 200px;
  height: 200px;
`

function App () {
  return (
    <Router>
      <Wrapper>
        <Main>
          <Switch>
            <Route exact path='/statistics'>
              <div>statistics</div>
            </Route>
            <Route exact path='/money'>
              asdasdasdas
            </Route>
            <Route exact path='/reportForm'>
              <div>这是repostForm</div>
            </Route>

            <Redirect exact from='/' to='/money' />
            <Route path='*'>
              <NoMatch>页面不存在</NoMatch>
            </Route>
          </Switch>
        </Main>
        <Nav />
      </Wrapper>
    </Router>
  )
}

export default App
