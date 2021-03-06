import axios from 'axios'
import React, { useContext, useState } from 'react'
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
  const addUserToBoard = async (e, userId) => {
    e.preventDefault()

    try {
      const { status } = await axios.post(
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

  const deleteUserFromBoard = async (e, userId) => {
    e.preventDefault()

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
        <form className="inline-absolute-form">
          <button className="close" onClick={toggleVisibility}>
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h2>Add a participant</h2>
          <label htmlFor="username-search">Username</label>
          <input
            id="username-search"
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
                    <button onClick={(e) => deleteUserFromBoard(e, user.id)}>
                      <i className="fa-solid fa-circle-minus"></i>{' '}
                      <span className="info-text">Remove</span>
                    </button>
                  ) : (
                    <button onClick={(e) => addUserToBoard(e, user.id)}>
                      <i className="fa-solid fa-circle-plus"></i>{' '}
                      <span className="info-text">Add</span>
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </form>
      )}
    </>
  )
}

export default NewUser
