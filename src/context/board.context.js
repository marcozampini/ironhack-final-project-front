import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const BoardContext = createContext()

function BoardProviderWrapper(props) {
  const [boards, setBoards] = useState([])
  const getAllBoards = async () => {
    try {
      const savedToken = localStorage.getItem('authToken')
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

  async function deleteBoard(boardId) {
    try {
      const savedToken = localStorage.getItem('authToken')
      await axios.delete(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        deleteBoard,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}

export { BoardProviderWrapper, BoardContext }
