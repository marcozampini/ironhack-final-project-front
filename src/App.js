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
import NotFound from './pages/NotFound'
import NamePage from './pages/NamePage'
import PopularNamesPage from './pages/PopularNamesPage'

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
          <Route path="/names/popular/:cca3" element={<PopularNamesPage />} />
          <Route
            path="/names/popular/:cca3/:limit"
            element={<PopularNamesPage />}
          />
          <Route path="/names/:nameId" element={<NamePage />} />
          <Route path="/*" element={<NotFound error={404} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
