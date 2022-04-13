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
        Do you already have an account? ->{' '}
        <a href="/wireframe/login.html">Log in</a>
      </p>
      <p>
        You don't? -> <a href="/wireframe/signup.html">Sign up</a>
      </p>
      <h3>If logged in</h3>
      <p>
        Page <a href="/wireframe/groups.html">Groups</a>
      </p>
    </>
  )
}

export default HomePage
