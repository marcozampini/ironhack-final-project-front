import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import './Sidebar.css'
const APP_NAME = process.env.REACT_APP_NAME

const Sidebar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const [sidebarClass, setSidebarClass] = useState('sidebar open')
  const [toggleMenuText, setToggleMenuText] = useState('Close menu')

  const handleMenu = () => {
    if (sidebarClass === 'sidebar open') {
      setSidebarClass('sidebar close')
      setToggleMenuText('Open menu')
    } else {
      setSidebarClass('sidebar open')
      setToggleMenuText('Close menu')
    }
  }
  return (
    <aside className={sidebarClass}>
      <h2>
        <Link to="./">{APP_NAME}</Link>
      </h2>
      {isLoggedIn && (
        <>
          <h3>
            <Link to="./boards">Boards</Link>
          </h3>
          <ul>
            <li>First board</li>
            <li>Second board</li>
          </ul>
          <ul>
            <li>Create a new board</li>
            <li>Pending invitations (1)</li>
          </ul>
        </>
      )}
      <h3>Inspiration</h3>
      <ul>
        <li>Popular names in Italy</li>
        <li>Popular names in France</li>
        <li>Popular names in England and Wales</li>
        <li>Popular names in Scotland</li>
        <li>Popular names in Northern Ireland</li>
        <li>Popular names in Spain</li>
      </ul>
      {isLoggedIn ? (
        <>
          <h3>{user.username}</h3>
          <ul>
            <li>
              <button onClick={logOutUser}>Log out</button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h3>Account</h3>
          <ul>
            <li>
              <Link to="./signup">Sign up</Link>
            </li>
            <li>
              <Link to="./login">Log in</Link>
            </li>
          </ul>
        </>
      )}
      <button onClick={handleMenu}>{toggleMenuText}</button>
    </aside>
  )
}

export default Sidebar
