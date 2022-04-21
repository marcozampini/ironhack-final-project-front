import React, { useContext, useState } from 'react'
import axios from 'axios'
import { CurrentBoardContext } from '../context/currentBoard.context'
const API_URL = process.env.REACT_APP_API_URL

const NewUser = ({ isVisible, toggleVisibility }) => {
  const { currentBoard, fetchBoard } = useContext(CurrentBoardContext)

  const savedToken = localStorage.getItem('authToken')
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    setUser(e.target.value)
    // Use this in use effect with the dependency of the user
    if (!e.target.value.length) {
      setUsers([])
    } else {
      const userGot = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${savedToken}` },
        params: { q: e.target.value },
      })
      console.log(userGot)
      setUsers(userGot.data)
    }
  }
  const addUserToBoard = async (userId) => {
    console.log(currentBoard)

    try {
      const { status, data: body } = await axios.post(
        `${API_URL}/boards/${currentBoard._id}/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      )
      if (status === 201) {
        fetchBoard(currentBoard._id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUserFromBoard = async (userId) => {
    console.log(currentBoard)

    try {
      const response = await axios.delete(
        `${API_URL}/boards/${currentBoard._id}/${userId}`,
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      )
      if (response.status === 204) {
        fetchBoard(currentBoard._id)
      }
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isVisible && (
        <div className="new-user-form">
          <div className="close">
            <button onClick={toggleVisibility}>Close</button>
          </div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Type the username here"
            onChange={handleSearch}
            value={user}
          />
          <ul>
            {users.map((user, index) => {
              return (
                <li className="username-item" key={user.id}>
                  {user.username}
                  {currentBoard.lists.some((list) => {
                    return list.owner._id === user.id
                  }) ? (
                    <button onClick={() => deleteUserFromBoard(user.id)}>
                      Remove
                    </button>
                  ) : (
                    <button onClick={() => addUserToBoard(user.id)}>Add</button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default NewUser
