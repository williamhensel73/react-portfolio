import './App.scss'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from 'react-loaders'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Portfolio from './components/Portfolio'

// Loaded on demand so the charting library is only downloaded by visitors who open the dashboard.
const Dashboard = lazy(() => import('./components/Dashboard'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader type="ball-clip-rotate-multiple" />}>
              <Dashboard/>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
