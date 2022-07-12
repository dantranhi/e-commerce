import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

import { get } from './utils/httpRequest'
import { loginStart, loginSuccess, loginFailed } from './store/actions'
import { useStore } from './store/UserContext'
import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './grid.css';
import './index.css';



function App() {
  const [, dispatch] = useStore()

  useEffect(() => {
    async function checkLogin() {
      dispatch(loginStart())
      try {
        const res = await get('/login/success')
        if (res.details) {
          localStorage.setItem('user', JSON.stringify(res.details))
          dispatch(loginSuccess(res.details))
        }
        else {
          console.log('Not logged in')
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('user')
        dispatch(loginFailed())
      }
    }
    checkLogin()
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          {routes.map((item, index) => {
            let Layout = DefaultLayout
            if (item.layout) Layout = item.layout
            if (item.layout === null) Layout = Fragment
            let Page = item.component
            return (
              <Route key={index} path={item.path} element={(
                <Layout>
                  <Page></Page>
                </Layout>
              )}>
              </Route>
            )
          })}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
