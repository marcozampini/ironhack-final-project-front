import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BoardContext } from '../context/board.context'
import NewBoardForm from '../components/NewBoardForm'
import './Boards.css'
import AvatarUsername from '../components/AvatarUsername'

const Boards = () => {
  const { boards, deleteBoard } = useContext(BoardContext)

  const handleDelete = async (boardId, event) => {
    const confirmed = window.confirm('Do you want to delete this board?')
    if (confirmed) {
      deleteBoard(boardId)
    }
  }

  return (
    <>
      <h1>Boards</h1>
      {boards ? (
        <>
          <div className="lists">
            {boards.map((board) => {
              return (
                <div className="list" key={board._id}>
                  <h2>
                    <Link to={board._id}>{board.name}</Link>
                  </h2>
                  <p>
                    <AvatarUsername
                      avatarUrl={board.owner.avatarUrl}
                      username={board.owner.username}
                    />
                  </p>
                  {board.isOwner && (
                    <button onClick={(e) => handleDelete(board._id, e)}>
                      <i className="fa-solid fa-trash-can"></i> Delete board
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          <h2>Create a new board</h2>
        </>
      ) : (
        <div className="main-content">
          <p>No boards created. Why don't you create a new board?</p>
        </div>
      )}
      <div className="main-content">
        <NewBoardForm />
      </div>
    </>
  )
}

export default Boards
