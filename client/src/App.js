import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Fragment} from 'react'

import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import './grid.css';
import './index.css';



function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {routes.map(item => {
            let Layout = DefaultLayout
            if (item.layout) Layout = item.layout
            if (item.layout===null) Layout = Fragment
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
