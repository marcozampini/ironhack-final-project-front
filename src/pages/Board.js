import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AvatarUsername from '../components/AvatarUsername'
import Name from '../components/names/Name'
import NameSearchModal from '../components/names/NameSearchModal'
import NewBoardNameForm from '../components/NewBoardNameForm'
import NewParticipantForm from '../components/NewParticipantForm'
import { BoardContext } from '../context/board.context'
import { CurrentBoardContext } from '../context/currentBoard.context'
import { NameSearchContext } from '../context/nameSearch.context'
import './Boards.css'

const Board = () => {
  const { currentBoard, fetchBoard } = useContext(CurrentBoardContext)
  const { deleteBoard, deleteList, deleteName, capitalizeFirstLetter } =
    useContext(BoardContext)
  const { resetSearch } = useContext(NameSearchContext)

  const savedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const [modalVisible, setModalVisible] = useState(false)
  const [addFormVisible, setAddFormVisible] = useState(false)
  const [renameFormVisible, setRenameFormVisible] = useState(false)

  const { boardId } = useParams()

  const getBoard = useCallback(async () => {
    resetSearch()
    await fetchBoard(boardId)
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

  const handleDeleteList = async (boardId, userId, isOwner, event) => {
    const confirmed = window.confirm('Do you want to delete this list?')
    if (confirmed) {
      await deleteList(boardId, userId)
      getBoard()
      if (isOwner) {
        navigate('/boards')
      } else {
      }
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

  const toggleAddFormVisibility = () => {
    setAddFormVisible(!addFormVisible)
  }

  const toggleRenameFormVisibility = () => {
    setRenameFormVisible(!renameFormVisible)
  }

  return (
    <>
      <NameSearchModal
        isVisible={modalVisible}
        toggleVisibility={toggleModalVisibility}
      />

      {currentBoard && (
        <>
          <h1 className="board-name">
            <span>{currentBoard.name}</span>
            <AvatarUsername
              avatarUrl={currentBoard.owner.avatarUrl}
              username={currentBoard.owner.username}
              textAfter={"'s board"}
            />
          </h1>
          {currentBoard.isOwner ? (
            <>
              <button onClick={toggleAddFormVisibility}>Add participant</button>
              <button onClick={toggleRenameFormVisibility}>Rename board</button>
              <button onClick={handleDeleteBoard}>Delete board</button>
              <NewParticipantForm
                isVisible={addFormVisible}
                toggleVisibility={toggleAddFormVisibility}
              />
              <NewBoardNameForm
                isVisible={renameFormVisible}
                toggleVisibility={toggleRenameFormVisibility}
              />
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
                    {list.names
                      .sort((a, b) => {
                        if (b.weight === a.weight) {
                          return a.value.localeCompare(b.value)
                        } else {
                          return b.weight - a.weight
                        }
                      })
                      .map((name) => {
                        return (
                          <>
                            <Name
                              key={list._id + '--' + name._id}
                              weight={name.weight}
                              name={name.value}
                              nameId={name._id}
                              displayMode={list.isOwner === false}
                              list={list}
                            />
                          </>
                        )
                      })}
                  </ul>
                  {list.isOwner && (
                    <button onClick={toggleModalVisibility}>
                      <i className="fa-solid fa-circle-plus"></i> Add name
                    </button>
                  )}
                  {((list.isOwner && !currentBoard.isOwner) ||
                    (!list.isOwner && currentBoard.isOwner)) && (
                    <button
                      onClick={(e) =>
                        handleDeleteList(
                          currentBoard._id,
                          list.owner._id,
                          list.isOwner,
                          e
                        )
                      }
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete list
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
