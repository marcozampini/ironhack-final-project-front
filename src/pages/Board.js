import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AvatarUsername from '../components/AvatarUsername'
import NameSearchModal from '../components/names/NameSearchModal'
import NewUser from '../components/NewUser'
import { BoardContext } from '../context/board.context'
import { CurrentBoardContext } from '../context/currentBoard.context'
import { NameSearchContext } from '../context/nameSearch.context'
import './Boards.css'

const Board = () => {
  const { currentBoard, fetchBoard } = useContext(CurrentBoardContext)
  const { deleteBoard, deleteList, deleteName } = useContext(BoardContext)
  const { resetSearch } = useContext(NameSearchContext)

  const savedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const [modalVisible, setModalVisible] = useState(false)
  const { boardId } = useParams()

  const getBoard = useCallback(async () => {
    resetSearch()
    await fetchBoard(boardId)
  }, [boardId, savedToken])

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

  return (
    <>
      <NameSearchModal
        isVisible={modalVisible}
        toggleVisibility={toggleModalVisibility}
      />
      <h1 className="board-name">
        <span>{currentBoard.name}</span>
        <AvatarUsername
          avatarUrl={currentBoard.owner.avatarUrl}
          username={currentBoard.owner.username}
          textAfter={"'s board"}
        />
      </h1>
      {currentBoard && (
        <>
          {currentBoard.isOwner ? (
            <>
              <form className="rename-board-form undisplayed">
                <input type="text" value={currentBoard.name} />
                <input type="submit" value="Save" onClick={handleRenameBoard} />
                <input type="button" value="Cancel" onClick={hideRenameForm} />
              </form>
              <NewUser />
              <button className="add-participant">Add participant</button>
              <button className="rename-button" onClick={showRenameForm}>
                Rename board
              </button>
              <button onClick={handleDeleteBoard}>Delete board</button>
            </>
          ) : (
            <></>
          )}

          <div className="lists">
            {currentBoard.lists.map((list) => {
              return (
                <div className="list" key={list._id}>
                  <h2>
                    <AvatarUsername
                      avatarUrl={list.owner.avatarUrl}
                      username={list.owner.username}
                      textAfter={"'s list"}
                    />
                  </h2>

                  <ul>
                    {list.names.map((name) => {
                      return (
                        <li key={list._id + '--' + name._id}>
                          {name.value}
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
                  {list.isOwner && (
                    <button onClick={toggleModalVisibility}>Add name</button>
                  )}
                  {list.isOwner && !currentBoard.isOwner && (
                    <button
                      onClick={(e) =>
                        handleDeleteList(currentBoard._id, list.owner._id, e)
                      }
                    >
                      Delete list
                    </button>
                  )}
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
