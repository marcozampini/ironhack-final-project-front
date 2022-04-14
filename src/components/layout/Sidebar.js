import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
const APP_NAME = process.env.REACT_APP_NAME

const Sidebar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext)

  return (
    <aside className="Sidebar">
      <h2>{APP_NAME}</h2>
      <ul>
        {isLoggedIn ? (
          <li>
            <button onClick={logOutUser}>Log out</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="./signup">Sign up</Link>
            </li>
            <li>
              <Link to="./login">Log in</Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  )
}

export default Sidebar
