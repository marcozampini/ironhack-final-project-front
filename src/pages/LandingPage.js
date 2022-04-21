import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <div className="landingPageDiv">
        <h1>Pick The One</h1>
      </div>
      <h1>Search Baby Names</h1>

      <p>
        Pick the one has a great way to find the perfect name for baby: look up
        for a name, add it to your list and share it with your friends and
        family.
      </p>
      <h5>LOOKING TO GET INSPIRED?? </h5>
      <p>
        Why don't you create a board and add your family and friends for their
        suggestions.
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
