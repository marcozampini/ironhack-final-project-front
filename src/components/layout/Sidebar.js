import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { BoardContext } from '../../context/board.context'
import AvatarUsername from '../AvatarUsername'
const APP_NAME = process.env.REACT_APP_NAME

const Sidebar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const [sidebarClass, setSidebarClass] = useState('sidebar open')
  const [toggleMenuText, setToggleMenuText] = useState('Close menu')
  const countries = [
    { cca3: 'ita', name: 'Italy' },
    { cca3: 'fra', name: 'France' },
    { cca3: 'gbr', name: 'United Kingdom' },
  ]

  const handleMenu = () => {
    if (sidebarClass === 'sidebar open') {
      setSidebarClass('sidebar closed')
      setToggleMenuText('Open menu')
    } else {
      setSidebarClass('sidebar open')
      setToggleMenuText('Close menu')
    }
  }

  const { boards } = useContext(BoardContext)

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

          {boards && (
            <ul>
              {boards.map((board) => {
                return (
                  <li key={board._id}>
                    <Link to={'boards/' + board._id}>{board.name}</Link>
                  </li>
                )
              })}
            </ul>
          )}

          <h4>
            <Link to="./boards/new">Create a new board</Link>
          </h4>
        </>
      )}
      <h3>Popular names</h3>
      {countries && (
        <ul>
          {countries.map((country) => {
            return (
              <li key={country.cca3}>
                <Link to={'names/popular/' + country.cca3}>
                  Most popular names in {country.name}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {isLoggedIn ? (
        <>
          <h3>
            <AvatarUsername
              avatarUrl={user.avatarUrl}
              username={user.username}
            />
          </h3>
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
