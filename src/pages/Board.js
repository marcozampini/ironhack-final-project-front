import { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BoardContext } from '../context/board.context'
import NameSearchModal from '../components/names/NameSearchModal'
import AvatarUsername from '../components/AvatarUsername'
import './Boards.css'
import { NameSearchContext } from '../context/nameSearch.context'

const API_URL = process.env.REACT_APP_API_URL

const Board = () => {
  const savedToken = localStorage.getItem('authToken')
  const { deleteBoard, deleteList, deleteName } = useContext(BoardContext)
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

  const showRenameForm = (event) => {
    document.querySelector('.board-name').classList.add('undisplayed')
    document.querySelector('.rename-board-form').classList.remove('undisplayed')
    document.querySelector('.rename-button').classList.add('undisplayed')
  }

  const hideRenameForm = (event) => {
    document.querySelector('.board-name').classList.remove('undisplayed')
    document.querySelector('.rename-board-form').classList.add('undisplayed')
    document.querySelector('.rename-button').classList.remove('undisplayed')
  }

  const handleRenameBoard = async (event) => {
    getBoard()
  }
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
        isVisible={modalVisible}
        toggleVisibility={toggleModalVisibility}
      />
      {board && (
        <>
          {board.isOwner ? (
            <>
              <h1 className="board-name">{board.name}</h1>
              <form className="rename-board-form undisplayed">
                <input type="text" value={board.name} />
                <input type="submit" value="Save" onClick={handleRenameBoard} />
                <input type="button" value="Cancel" onClick={hideRenameForm} />
              </form>
              <button className="rename-button" onClick={showRenameForm}>
                Rename board
              </button>
              <button onClick={handleDeleteBoard}>Delete board</button>
            </>
          ) : (
            <>
              <h1>{board.name}</h1>
            </>
          )}
          <AvatarUsername
            avatarUrl={board.owner.avatarUrl}
            username={board.owner.username}
          />

          <div className="lists">
            {board.lists.map((list) => {
              return (
                <div className="list" key={list._id}>
                  <h2>
                    <AvatarUsername
                      textBefore={'List by'}
                      avatarUrl={list.owner.avatarUrl}
                      username={list.owner.username}
                    />
                  </h2>
                  {list.isOwner && (
                    <button onClick={handleAddName}>Add name</button>
                  )}
                  {list.isOwner && !board.isOwner && (
                    <button
                      onClick={(e) =>
                        handleDeleteList(board._id, list.owner._id, e)
                      }
                    >
                      Delete list
                    </button>
                  )}
                  <p>List id: {list._id}</p>
                  <ul>
                    {list.names.map((name) => {
                      return (
                         <li key={list._id + '--' + name._id}>
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
