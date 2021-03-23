import './App.css'
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Home from './pages/home/components/Home'
import Trash from './pages/sub/components/TrashList'
import LeftMenu from './pages/menu/LeftMenu'

function App() {
  const { Header, Footer, Sider, Content } = Layout
  return (
    <div className="App">
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh', background: '#fff' }}>
           <div style={{ height: 60 }}>Logo</div>
          <LeftMenu />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', textAlign: 'right', padding: 0 }}>
            header
            <Avatar icon={<UserOutlined />} />
          </Header>
          <Content style={{ textAlign: '-webkit-center', margin: '24px 16px 0' }}>
            <Suspense fallback={(<div>Loading...</div>)}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/trash" component={Trash} />
              </Switch>
            </Suspense>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by Seorim</Footer>
        </Layout>

      </Layout>
    </div>
  )
}

export default App
