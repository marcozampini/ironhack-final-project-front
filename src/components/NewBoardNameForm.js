import React, { useContext, useState } from 'react'
import axios from 'axios'
import { CurrentBoardContext } from '../context/currentBoard.context'
const API_URL = process.env.REACT_APP_API_URL

const NewBoardNameForm = ({ isVisible, toggleVisibility }) => {
  const { currentBoard } = useContext(CurrentBoardContext)

  const savedToken = localStorage.getItem('authToken')
  return (
    <>
      {isVisible && (
        <form className="new-form">
          <div className="close">
            <button onClick={toggleVisibility}>Close</button>
          </div>
          <h2>Rename the board</h2>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Type the new name here"
            value={currentBoard.name}
          />
          <input type="submit" value="Save" />
        </form>
      )}
    </>
  )
}

export default NewBoardNameForm
