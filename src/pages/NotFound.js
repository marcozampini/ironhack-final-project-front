import { useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h1>Sorry... this pages leads nowhere</h1>
      <p>
        {' '}
        <Link to="/"> Let's get you back home</Link>
      </p>
    </>
  )
}

export default NotFound
