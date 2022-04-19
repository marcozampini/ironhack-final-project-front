import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './Boards.css'
import NameSearchModal from '../components/layout/NameSearchModal'

const API_URL = process.env.REACT_APP_API_URL

const Board = () => {
  const savedToken = localStorage.getItem('authToken')
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

  const handleDelete = async (event) => {
    const confirmed = window.confirm('Do you want to delete this board?')
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/boards/${boardId}`, {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        navigate('/boards')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  }

  const handleAddName = async () => {
    toggleModalVisibility();
  }

  return (
    <>
      <NameSearchModal boardId={boardId} isVisible={modalVisible} toggleVisibility={toggleModalVisibility} />
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
                        <li key={name._id}>
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
