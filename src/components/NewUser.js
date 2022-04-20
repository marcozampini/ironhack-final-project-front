import React, { useState } from 'react'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const NewUser = (props) => {
  const savedToken = localStorage.getItem('authToken')
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    setUser(e.target.value)
    // Use this in use effect with the dependency of the user
    const userGot = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${savedToken}` },
      params: { q: e.target.value },
    })
    console.log(userGot)
    setUsers(userGot.data)
  }
  const addUserToBoard = async (userId) => {
    try {
      await axios.post(
        `${API_URL}/boards/${props.boardId}/${userId}`,
        { user: 'rex' },
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleSearch}
        value={user}
      />

      <ul>
        {users.map((user, index) => {
          return (
            <li onClick={() => addUserToBoard(user.id)}>{user.username}</li>
          )
        })}
      </ul>
    </>
  )
}

export default NewUser
