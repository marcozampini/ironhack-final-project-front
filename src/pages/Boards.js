import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL

const Boards = () => {
  const savedToken = localStorage.getItem('authToken')

  const [boards, setBoards] = useState([])
  const getAllBoards = async () => {
    try {
      const response = await axios.get(`${API_URL}/boards`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setBoards(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllBoards()
  }, [])

  return (
    <>
      <h1>Boards</h1>
      {boards.map((board) => {
        return (
          <div key={board._id}>
            <h2>
              <Link to={board._id}>{board.name}</Link>
            </h2>
            <p>Created by {board.owner}</p>
            <p>xxx members</p>
            <p>xxx names</p>
          </div>
        )
      })}
    </>
  )
}

export default Boards
