import './App.css'
import React, { Suspense } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Result } from 'antd'
import styled from 'styled-components'
import Home from './pages/home/Home'
import Trash from './pages/trash/Trash'
import LeftMenu from './pages/menu/Menu'

const BREAK_POINT_MOBILE = 768
const AppContainer = styled.div`
* {
  box-sizing: border-box;
}
`
const HeaderContainer = styled.div`
  padding: 1 rem;
`
const Title = styled.div`
  font-size: xx-large;
  font-weight: bolder;
  margin-top: 20px;
  text-align: center;
  position: relative; 
`
const MenuContainer = styled.div`
  width: calc(100%/7);
  float: left;
  padding: 15px;
  margin-left: 15px;
`
// Main 컴포넌트
const Main = styled.div`
  width: 70%;
  float: left;
  padding: 15px;
  @media (max-width:${BREAK_POINT_MOBILE}px) {
    width: 100%;
  }
`
function NoMatch() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  )
}

function App() {
  return (
    <AppContainer>
      <div className="App">
        <HeaderContainer>
          <Title>D-day</Title>
        </HeaderContainer>
        <MenuContainer>
          <LeftMenu />
        </MenuContainer>
        <Main>
          <Suspense fallback={(<h1>Loading...</h1>)}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/trash" component={Trash} />
              <Route path="*"><NoMatch /></Route>
            </Switch>
          </Suspense>
        </Main>
      </div>
    </AppContainer>
  )
}

export default App
