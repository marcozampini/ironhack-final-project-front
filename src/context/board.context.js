import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const BoardContext = createContext()

const savedToken = localStorage.getItem('authToken')

function BoardProviderWrapper(props) {
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

  async function createBoard(formData) {
    try {
      await axios.post(`${API_URL}/boards`, formData, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteBoard(boardId) {
    try {
      await axios.delete(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteList(boardId, userId) {
    try {
      await axios.delete(`${API_URL}/boards/${boardId}/${userId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }
  async function deleteName(listId, nameId) {
    try {
      await axios.delete(`${API_URL}/lists/${listId}/${nameId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        createBoard,
        deleteBoard,
        deleteList,
        deleteName,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}

export { BoardProviderWrapper, BoardContext }
