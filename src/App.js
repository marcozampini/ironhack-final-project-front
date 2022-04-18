import './App.css'
import { Routes, Route } from 'react-router-dom'
import IsAnonymous from './components/IsAnonymous'
import IsPrivate from './components/IsPrivate'

import Sidebar from './components/layout/Sidebar'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Boards from './pages/Boards'
import Board from './pages/Board'
import NewBoard from './pages/NewBoard'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route
            path="/boards"
            element={
              <IsPrivate>
                <Boards />
              </IsPrivate>
            }
          />
          <Route
            path="/boards/new"
            element={
              <IsPrivate>
                <NewBoard />
              </IsPrivate>
            }
          />
          <Route
            path="/boards/:boardId"
            element={
              <IsPrivate>
                <Board />
              </IsPrivate>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
