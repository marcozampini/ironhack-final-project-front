import { useContext, useEffect, useState } from 'react'
import { BoardContext } from '../../context/board.context'
import { CurrentBoardContext } from '../../context/currentBoard.context'
import './Name.css'

const Name = ({ data, list }) => {
  const { currentBoard, currentBoardOwnedList, fetchBoard } =
    useContext(CurrentBoardContext)
  const [isInList, setIsInList] = useState(
    currentBoardOwnedList?.names.some((item) => item.value === data.name.value)
  )
  const [errorFetch, setErrorFetch] = useState('')
  const { addName, deleteName } = useContext(BoardContext)

  async function handleAdd() {
    setErrorFetch('')
    try {
      const { status, data: body } = await addName(list._id, data.name, 42)
      if (status === 200) {
        await fetchBoard(currentBoard._id)
      } else {
        console.error(status, body)
        setErrorFetch('Error: Could not add the name right now')
      }
    } catch (error) {
      console.error(error)
      setErrorFetch('Error: Could not add the name right now')
    }
  }

  async function handleDelete() {
    setErrorFetch('')
    try {
      const { status, data: body } = await deleteName(list._id, data.name._id)
      if (status === 204) {
        await fetchBoard(currentBoard._id)
      } else {
        console.error(status, body)
        setErrorFetch('Error: Could not delete the name right now')
      }
    } catch (error) {
      console.error(error)
      setErrorFetch('Error: Could not delete the name right now')
    }
  }

  useEffect(() => {
    setIsInList(
      currentBoardOwnedList?.names.some(
        (item) => item.value === data.name.value
      )
    )
  }, [currentBoardOwnedList])

  return (
    <>
      <div>
        {data.name.value}
        {isInList ? (
          <button onClick={handleDelete}>REMOVE</button>
        ) : (
          <button onClick={handleAdd}>ADD</button>
        )}
        {errorFetch.length ? <p className='errorMessage'>{errorFetch}</p> : ''}
      </div>
    </>
  )
}

export default Name

// const [formData, setFormData] = useState({weight: 0});
// <form onSubmit={handleSubmit}>
//   <label htmlFor='q'>Name</label>
//   <input
//     id='q'
//     type='number'
//     value={formData.q}
//     onChange={handleChanges}
//   />
//   <input type='submit' value='search' />
//   <button onClick={() => addNameToList(data.name)}>ADD</button>
// </form>
