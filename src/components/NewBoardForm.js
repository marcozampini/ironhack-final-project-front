import React, { useContext, useState } from 'react'
import { BoardContext } from '../context/board.context'

const NewBoardForm = () => {
  const { createBoard } = useContext(BoardContext)

  const [formData, setFormData] = useState({
    name: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault()
    if (formData.name.length) {
      createBoard(formData)
      setFormData({
        name: '',
      })
    } else {
      setErrorMessage('Please provide a name')
    }
  }
  const handleChanges = (event) => {
    setErrorMessage('')
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
          placeholder="Type the board's name here"
          onChange={handleChanges}
        />
        <input type="submit" value="Add board" />
        <p>{errorMessage.length !== 0 && errorMessage}</p>
      </form>
    </>
  )
}

export default NewBoardForm
