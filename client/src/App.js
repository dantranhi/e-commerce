import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { useEffect } from 'react'
import {get} from './utils/httpRequest'

import { useAuth } from './store/UserContext'
import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import './grid.css';
import './index.css';



function App() {
  const [account, setAccount] = useAuth()

  useEffect(() => {
    async function checkLogin() {
      const res = await get('/login/success')
      if (res.details) {
        console.log(res)
        setAccount(res.details)
        localStorage.setItem('user', JSON.stringify(res.details))
      }
    }
    checkLogin()
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          {routes.map(item => {
            let Layout = DefaultLayout
            if (item.layout) Layout = item.layout
            if (item.layout === null) Layout = Fragment
            let Page = item.component
            return (
              <Route key={item.id} path={item.path} element={(
                <Layout>
                  <Page></Page>
                </Layout>
              )}>
              </Route>
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
