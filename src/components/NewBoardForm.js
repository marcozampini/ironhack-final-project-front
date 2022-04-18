import React, { useState } from 'react'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const NewBoardForm = () => {
  const savedToken = localStorage.getItem('authToken')
  const [formData, setFormData] = useState({
    name: '',
  })

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault()
    try {
      await axios.post(`${API_URL}/boards`, formData, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setFormData({
        name: '',
      })
    } catch (error) {
      console.error(error)
    }
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
