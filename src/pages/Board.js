import React from 'react'
import { Link } from 'react-router-dom'

const Board = () => {
  return (
    <>
      <h1>Names for my grandson</h1>

      <p>Created by me - I'm the owner</p>
      <p>3 members</p>
      <p>42 names</p>

      <p>There is a list for every participant</p>
      <p>The user can edit only the list that owns</p>
      <div>
        <div>
          <h2>My list</h2>
          <ul>
            <li>Aida</li>
            <li>Alma</li>
            <li>Anna</li>
            <li>Anita</li>
            <li>Akanksha</li>
          </ul>
          <a href="/wireframe/groups-id-edit.html">Edit mode</a>
        </div>
        <div>
          <h2>Anna's list</h2>
          <ul>
            <li>Aida</li>
            <li>Alma</li>
            <li>Anna</li>
            <li>Anita</li>
            <li>Akanksha</li>
          </ul>
        </div>
        <div>
          <h2>Brian's list</h2>
          <ul>
            <li>Aida</li>
            <li>Alma</li>
            <li>Anna</li>
            <li>Anita</li>
            <li>Akanksha</li>
          </ul>
        </div>
        <div>
          <h2>Akanksha's list</h2>
          <ul>
            <li>Aida</li>
            <li>Alma</li>
            <li>Anna</li>
            <li>Anita</li>
            <li>Akanksha</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Board
