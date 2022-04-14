import React from 'react'
import { Link } from 'react-router-dom'

const Boards = () => {
  return (
    <>
      <h1>Boards</h1>

      <p>List of the boards - the user is a participant</p>

      <h2>
        <Link to="./boardId">Names for my grandson</Link>
      </h2>
      <p>Created by me - I'm the owner</p>
      <p>3 members</p>
      <p>42 names</p>

      <h2>Names for my sister</h2>
      <p>Created by John</p>
      <p>3 members</p>
      <p>42 names</p>

      <h2>Names for my friend's baby</h2>
      <p>Created by Peter</p>
      <p>3 members</p>
      <p>42 names</p>
    </>
  )
}

export default Boards
