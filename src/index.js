import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { AuthProviderWrapper } from './context/auth.context'
import { BoardProviderWrapper } from './context/board.context'
import { CurrentBoardProviderWrapper } from './context/currentBoard.context'
import { NameSearchProviderWrapper } from './context/nameSearch.context'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <BoardProviderWrapper>
          <CurrentBoardProviderWrapper>
            <NameSearchProviderWrapper>
              <App />
            </NameSearchProviderWrapper>
          </CurrentBoardProviderWrapper>
        </BoardProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
