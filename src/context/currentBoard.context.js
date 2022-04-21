import { useState, useEffect, createContext, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL

const CurrentBoardContext = createContext()

function CurrentBoardProviderWrapper(props) {
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentBoardOwnedList, setCurrentBoardOwnedList] = useState(null)
  const navigate = useNavigate()

  const fetchBoard = useCallback(
    async (id) => {
      try {
        if (id) {
          const savedToken = localStorage.getItem('authToken')
          const response = await axios.get(`${API_URL}/boards/${id}`, {
            headers: { Authorization: `Bearer ${savedToken}` },
          })
          setCurrentBoard(response.data)
        }
      } catch (error) {
        console.error(error)
        navigate('/boards')
      }
    },
    [navigate]
  )

  useEffect(() => {
    if (currentBoard?.lists) {
      setCurrentBoardOwnedList(currentBoard.lists.find((list) => list.isOwner))
    }
  }, [currentBoard])

  return (
    <CurrentBoardContext.Provider
      value={{
        currentBoard,
        setCurrentBoard,
        currentBoardOwnedList,
        setCurrentBoardOwnedList,
        fetchBoard,
      }}
    >
      {props.children}
    </CurrentBoardContext.Provider>
  )
}

export { CurrentBoardProviderWrapper, CurrentBoardContext }
