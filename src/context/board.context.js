import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth.context'
const API_URL = process.env.REACT_APP_API_URL

const BoardContext = createContext()

function BoardProviderWrapper(props) {
  const [boards, setBoards] = useState([])
  const { isLoggedIn, user } = useContext(AuthContext)

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
    if (!isLoggedIn) {
      setBoards([])
      return
    }
    getAllBoards()
  }, [user, isLoggedIn])

  async function createBoard(formData) {
    const savedToken = localStorage.getItem('authToken')
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
    const savedToken = localStorage.getItem('authToken')
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
    const savedToken = localStorage.getItem('authToken')
    try {
      await axios.delete(`${API_URL}/boards/${boardId}/${userId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      getAllBoards()
    } catch (error) {
      console.error(error)
    }
  }

  async function addName(listId, nameId, weight) {
    const savedToken = localStorage.getItem('authToken')
    try {
      const response = await axios.post(
        `${API_URL}/lists/${listId}`,
        {
          name: nameId,
          weight,
        },
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      )
      return response
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteName(listId, nameId) {
    const savedToken = localStorage.getItem('authToken')
    try {
      const response = await axios.delete(
        `${API_URL}/lists/${listId}/${nameId}`,
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      )
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const capitalizeFirstLetter = (string) => {
    let capitalizedString =
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    const indexOfCharAfterDash = capitalizedString.indexOf('-') + 1
    if (indexOfCharAfterDash === 0) {
      return capitalizedString
    } else {
      capitalizedString =
        capitalizedString.slice(0, indexOfCharAfterDash) +
        capitalizedString.charAt(indexOfCharAfterDash).toUpperCase() +
        capitalizedString.slice(indexOfCharAfterDash + 1)
      return capitalizedString
    }
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        createBoard,
        deleteBoard,
        deleteList,
        addName,
        deleteName,
        capitalizeFirstLetter,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}

export { BoardProviderWrapper, BoardContext }
