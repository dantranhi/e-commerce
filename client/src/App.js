import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';

import { useStore } from './store/UserContext'
import { logout, loginSuccess, setLoading } from './store/actions'
import { get } from './utils/httpRequest'
import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import 'antd/dist/antd.min.css';
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import './grid.css';
import './index.css';



function App() {
  const [, dispatch] = useStore()
  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true))
      const res = await get('/auth/login/success')
      if (res.success) {
        dispatch(loginSuccess({ details: res.user }))
      }
      else {
        dispatch(logout())
      }
    }
    getUser();
  }, []);


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
