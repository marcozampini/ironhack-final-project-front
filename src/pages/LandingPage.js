import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
const APP_NAME = process.env.REACT_APP_NAME

const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <h1>{APP_NAME}</h1>
      <h2>Search baby names</h2>
      <div className="main-content">
        <p>
          <strong>{APP_NAME}</strong> has a great way to find the perfect name
          for a baby: look up for a name, add it to your list and share it with
          your friends and family.
        </p>
      </div>
      <h2>Looking to get inspired?</h2>
      <div className="main-content">
        <p>
          You can see the most popular names in 2020 in{' '}
          <Link to="./names/popular/ita">Italy</Link>,{' '}
          <Link to="./names/popular/fra">France</Link> and{' '}
          <Link to="./names/popular/gbr">United Kingdom</Link>.
        </p>
      </div>
      <h2>Ready?</h2>
      <div className="main-content">
        {isLoggedIn ? (
          <>
            <p>
              You can <Link to="./boards">see your boards</Link> or{' '}
              <Link to="./boards/new">create a board</Link> and add your family
              and friends for their suggestions.
            </p>
            <p>Have fun!</p>
          </>
        ) : (
          <>
            <p>
              If you want to create lists of names and share them with your
              family and friends, you need to <Link to="./signup">sign up</Link>
              .
            </p>
            <p>
              Do you already have an account? <Link to="./login">Log in</Link>{' '}
              and have fun!
            </p>
          </>
        )}
      </div>
      <div className="main-content">
        <p>
          <strong>The {APP_NAME} Team</strong>,
        </p>
        <p>
          <strong>Akanksha, Brian and Marco</strong>
        </p>
      </div>
    </>
  )
}

export default LandingPage
