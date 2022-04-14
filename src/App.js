import './App.css'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import IsAnonymous from './components/IsAnonymous'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <IsAnonymous>
                <SignupPage />
              </IsAnonymous>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnonymous>
                <LoginPage />
              </IsAnonymous>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
