import React, { useContext, useState } from 'react'
import { BoardContext } from '../context/board.context'

const NewBoardForm = () => {
  const { createBoard } = useContext(BoardContext)

  const [formData, setFormData] = useState({
    name: '',
  })

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault()
    createBoard(formData)
    setFormData({
      name: '',
    })
  }
  const handleChanges = (event) => {
    const { value } = event.target
    const newFormData = { name: value }
    setFormData(newFormData)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChanges}
        />
        <input type="submit" value="Add board" />
      </form>
    </>
  )
}

export default NewBoardForm
