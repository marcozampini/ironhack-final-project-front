import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const CurrentBoardContext = createContext()

const savedToken = localStorage.getItem('authToken')

function CurrentBoardProviderWrapper(props) {
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentBoardOwnedList, setCurrentBoardOwnedList] = useState(null)

  async function fetchBoard(id) {
    try {
      if (id) {
        const response = await axios.get(`${API_URL}/boards/${id}`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        setCurrentBoard(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentBoard?.lists) {
      setCurrentBoardOwnedList(currentBoard.lists.find((list) => list.isOwner));
    }
  }, [currentBoard])

  return (
    <CurrentBoardContext.Provider
      value={{
        currentBoard,
        setCurrentBoard,
        currentBoardOwnedList,
        setCurrentBoardOwnedList,
        fetchBoard
      }}
    >
      {props.children}
    </CurrentBoardContext.Provider>
  )
}

export { CurrentBoardProviderWrapper, CurrentBoardContext }
