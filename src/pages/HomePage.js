import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <h3>If not logged in</h3>
      <p>
        This is a wonderful app to help you choose the best name for your baby.
      </p>
      <p>
        Do you already have an account? -> <Link to="./login">Log in</Link>
      </p>
      <p>
        You don't? -> <Link to="./signup">Sign up</Link>
      </p>
      <h3>If logged in</h3>
      <p>
        Page <a href="/wireframe/groups.html">Groups</a>
      </p>
    </>
  )
}

export default HomePage
