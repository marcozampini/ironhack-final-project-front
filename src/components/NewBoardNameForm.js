import React, { useContext, useState } from 'react'
import { CurrentBoardContext } from '../context/currentBoard.context'
import { BoardContext } from '../context/board.context'

const NewBoardNameForm = ({ boardId, isVisible, toggleVisibility }) => {
  const { currentBoard, fetchBoard } = useContext(CurrentBoardContext)
  const { renameBoard } = useContext(BoardContext)

  const [formData, setFormData] = useState({
    name: currentBoard.name,
  })

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault()
    renameBoard(formData, boardId)
    fetchBoard(boardId)
    toggleVisibility()
  }

  const handleChanges = (event) => {
    const { value } = event.target
    const newFormData = { name: value }
    setFormData(newFormData)
  }

  return (
    <>
      {isVisible && (
        <form className="new-form" onSubmit={handleSubmit}>
          <div className="close">
            <button onClick={toggleVisibility}>Close</button>
          </div>
          <h2>Rename the board</h2>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Type the new name here"
            value={formData.name}
            onChange={handleChanges}
          />
          <input type="submit" value="Save" />
        </form>
      )}
    </>
  )
}

export default NewBoardNameForm
