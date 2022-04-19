import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BoardContext } from '../context/board.context'
import NewBoardForm from '../components/NewBoardForm'
import './Boards.css'

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
          <div className="boards">
            {boards.map((board) => {
              return (
                <div className="board" key={board._id}>
                  <h2>
                    <Link to={board._id}>{board.name}</Link>
                  </h2>
                  <p>
                    Created by {board.owner.username}{' '}
                    {board.isOwner && (
                      <button onClick={(e) => handleDelete(board._id, e)}>
                        Delete board
                      </button>
                    )}
                  </p>
                  <p>xxx members</p>
                  <p>xxx names</p>
                </div>
              )
            })}
          </div>
          <h2>Create a new board</h2>
        </>
      ) : (
        <p>No boards created. Why don't you create a new board?</p>
      )}
      <NewBoardForm />
    </>
  )
}

export default Boards
