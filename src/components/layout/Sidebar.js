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
              <button onClick={logOutUser}>
                <i class="fa-solid fa-right-from-bracket"></i> Log out
              </button>
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
      <button onClick={handleMenu}>
        <i class="fa-solid fa-bars"></i> {toggleMenuText}
      </button>
      <div className="landingPagePopUp">
        <div class="box">
          <button>
            <a class="button" href="#popup1">
              Meet our team
            </a>
          </button>
        </div>
        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>Meet Our Team</h2>
            <a class="close" href="/#">
              &times;
            </a>
            <div class="content">
              <h4 className="textBold">Thanks for visiting our page!!</h4>{' '}
              <p>
                We are students fromIronhack, looking forward to build career as
                a webdeveloper. This is our final project of our web-development
                program.
              </p>
              <ul>
                <li className="textBold"> Brian Valette</li>
                <p>
                  Coffee professional retrained toward tech industry with the
                  same passion for well crafted products, willing to integrate a
                  tech team to bring my creativity and expertise in.
                </p>
                <h5>
                  <a href="https://github.com/42f">
                    {' '}
                    Github: https://github.com/42f
                  </a>
                </h5>
                <li className="textBold">Marco Zampini</li>
                <p>
                  I am passionate about IT and human relationships. My mission
                  is bring these two topics together. I'm working to make my
                  mission become my super power.
                </p>
                <h5>
                  <a href="https://github.com/marcozampini">
                    {' '}
                    Github: https://github.com/marcozampini
                  </a>
                </h5>
                <li className="textBold">Akanksha Pradhan</li>
                <p>
                  Highly motivated, self-starting developer seeking to launch a
                  career building web applications and services.
                </p>
                <h5>
                  <a href="https://github.com/Pradhan-90">
                    {' '}
                    Github: https://github.com/Pradhan-90
                  </a>
                </h5>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
