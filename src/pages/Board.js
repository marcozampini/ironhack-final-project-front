import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL

const Board = () => {
  const savedToken = localStorage.getItem('authToken')

  const [board, setBoard] = useState(null)
  const { boardId } = useParams()

  const getBoard = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setBoard(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBoard()
  }, [])

  return (
    <>
      {board && (
        <>
          <h1>Board {board.name}</h1>
          <p>Created by {board.owner}</p>
          {board.lists.map((list) => {
            return (
              <div key={list._id}>
                <h2>List by {list.owner}</h2>
                <p>List id: {list._id}</p>
                <p>Status: {list.status}</p>
                <ul>
                  {list.names.map((name) => {
                    return <li key={name._id}>{name.value}</li>
                  })}
                </ul>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default Board
