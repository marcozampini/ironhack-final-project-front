import { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardContext } from '../context/board.context'

import './Boards.css'
import NameSearchModal from '../components/names/NameSearchModal'
import { NameSearchContext } from '../context/nameSearch.context'

const API_URL = process.env.REACT_APP_API_URL

const Board = () => {
  const savedToken = localStorage.getItem('authToken')
  const { deleteBoard } = useContext(BoardContext)
  const navigate = useNavigate()
  const [board, setBoard] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { boardId } = useParams()
  const { setCurrentBoard } = useContext(NameSearchContext)

  const getBoard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setBoard(response.data)
      // set nameSearchContext currentBoard so adding name from the search result is possible
      setCurrentBoard(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [boardId, savedToken, setCurrentBoard])

  useEffect(() => {
    getBoard()
  }, [getBoard])

  const handleDelete = async (event) => {
    const confirmed = window.confirm('Do you want to delete this board?')
    if (confirmed) {
      await deleteBoard(boardId)
      navigate('/boards')
    }
  }

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible)
  }

  const handleAddName = async () => {
    toggleModalVisibility()
  }

  return (
    <>
      <NameSearchModal
        isVisible={modalVisible}
        toggleVisibility={toggleModalVisibility}
      />
      {board && (
        <>
          <h1>Board {board.name}</h1>
          <p>Created by {board.owner}</p>
          <button onClick={handleAddName}>Add name</button>
          {board.isOwner && (
            <button onClick={handleDelete}>Delete board</button>
          )}
          <div className="lists">
            {board.lists.map((list) => {
              return (
                <div className="list" key={list._id}>
                  <h2>List by {list.owner}</h2>
                  {list.isOwner && <span>It's me!</span>}
                  <p>List id: {list._id}</p>
                  <ul>
                    {list.names.map((name) => {
                      return (
                        <li key={list._id + '--' + name._id}>
                          {name.value} - w: {name.weight}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Board
