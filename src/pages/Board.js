import { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardContext } from '../context/board.context'

import './Boards.css'
import NameSearchModal from '../components/layout/NameSearchModal'

const API_URL = process.env.REACT_APP_API_URL

const Board = () => {
  const savedToken = localStorage.getItem('authToken')
  const { deleteBoard, deleteList, deleteName } = useContext(BoardContext)
  const navigate = useNavigate()
  const [board, setBoard] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const { boardId } = useParams()

  const getBoard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setBoard(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [boardId, savedToken])

  useEffect(() => {
    getBoard()
  }, [getBoard])

  const handleDeleteBoard = async (event) => {
    const confirmed = window.confirm('Do you want to delete this board?')
    if (confirmed) {
      await deleteBoard(boardId)
      navigate('/boards')
    }
  }

  const handleDeleteList = async (boardId, userId, event) => {
    const confirmed = window.confirm('Do you want to delete this list?')
    if (confirmed) {
      await deleteList(boardId, userId)
      navigate('/boards')
    }
  }
  const handleDeleteName = async (listId, nameId, event) => {
    const confirmed = window.confirm('Do you want to delete this name?')
    if (confirmed) {
      await deleteName(listId, nameId)
      getBoard()
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
        boardId={boardId}
        isVisible={modalVisible}
        toggleVisibility={toggleModalVisibility}
      />
      {board && (
        <>
          <h1>Board {board.name}</h1>
          <p>Created by {board.owner.username}</p>
          <button onClick={handleAddName}>Add name</button>
          {board.isOwner && (
            <button onClick={handleDeleteBoard}>Delete board</button>
          )}
          <div className="lists">
            {board.lists.map((list) => {
              return (
                <div className="list" key={list._id}>
                  <h2>List by {list.owner.username}</h2>
                  {list.isOwner && !board.isOwner && (
                    <button
                      onClick={(e) =>
                        handleDeleteList(board._id, list.owner._id, e)
                      }
                    >
                      Delete list
                    </button>
                  )}
                  {list.isOwner && <span>It's me!</span>}
                  <p>List id: {list._id}</p>
                  <ul>
                    {list.names.map((name) => {
                      return (
                        <li key={name._id}>
                          {name.value} - {name._id} - w: {name.weight}{' '}
                          {list.isOwner && (
                            <button
                              onClick={(e) =>
                                handleDeleteName(list._id, name._id, e)
                              }
                            >
                              Delete
                            </button>
                          )}
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
