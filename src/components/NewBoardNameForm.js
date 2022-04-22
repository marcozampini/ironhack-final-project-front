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
        <form className="inline-absolute-form" onSubmit={handleSubmit}>
          <button className="close" onClick={toggleVisibility}>
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h2>Rename the board</h2>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Type the new name here"
            value={formData.name}
            onChange={handleChanges}
          />
          <button type="submit">
            <i class="fa-solid fa-floppy-disk"></i> Save
          </button>
        </form>
      )}
    </>
  )
}

export default NewBoardNameForm
