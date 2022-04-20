import React, { useContext, useState } from 'react'
import axios from 'axios'
import { CurrentBoardContext } from '../context/currentBoard.context'
const API_URL = process.env.REACT_APP_API_URL

const NewUser = () => {
  const { currentBoard, fetchBoard } = useContext(CurrentBoardContext)

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
    console.log(currentBoard);
    try {
      const {status, data: body} = await axios.post(
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

  return (
    <>
      <h2>Add a Participant</h2>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleSearch}
        value={user}
      />

      <ul>
        {users.map((user, index) => {
          return (
            <li>
              {user.username}
              {/** here you check for a state which contains a boolean
              if the user is not in the list of current board participant

               const isAlreadyInTheBoard = currentBoard.lists.some(l => l.owner._id === user._id )
                then no button
                otherwise, add a button
              */}
              <button onClick={() => addUserToBoard(user.id)}>Add</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default NewUser
