import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { get } from './utils/httpRequest'

import { loginStart, loginSuccess, loginFailed } from './store/actions'
import { useStore } from './store/UserContext'
import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import './grid.css';
import './index.css';



function App() {
  const [,dispatch] = useStore()

  useEffect(() => {
    async function checkLogin() {
      dispatch(loginStart())
      const res = await get('/login/success')
      if (res.details) {
        dispatch(loginSuccess(res.details))
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
