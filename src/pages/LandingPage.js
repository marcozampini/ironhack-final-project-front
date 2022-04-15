import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <h1>Landing Page</h1>

      <p>
        This is a wonderful app to help you choose the best name for your baby.
      </p>
      {isLoggedIn ? (
        <>
          <p>
            Do you want to go to your boards? ->{' '}
            <Link to="./boards">Boards</Link>
          </p>
        </>
      ) : (
        <>
          <p>
            Do you already have an account? -> <Link to="./login">Log in</Link>
          </p>
          <p>
            You don't? -> <Link to="./signup">Sign up</Link>
          </p>
        </>
      )}
    </>
  )
}

export default LandingPage
