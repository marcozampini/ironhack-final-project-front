import { httpStatus } from 'http-status'
import { useContext, useState } from 'react'
import { BoardContext } from '../../context/board.context'
import { CurrentBoardContext } from '../../context/currentBoard.context'

const Name = ({ data, list }) => {
  const { currentBoard, currentBoardOwnedList, fetchBoard } =
    useContext(CurrentBoardContext)
  const [isInList, setIsInList] = useState(
    currentBoardOwnedList?.names.some((item) => item.value === data.name.value)
  )
  const { addName, deleteName } = useContext(BoardContext)

  async function handleAdd() {
    const status = await addName(list._id, data.name, 42)
    if (status === 200) {
      console.log('adding and fetching data for ', currentBoard._id)
      await fetchBoard(currentBoard._id)
    }
    setIsInList(
      currentBoardOwnedList?.names.some(
        (item) => item.value === data.name.value
      )
    )
  }

  async function handleDelete() {
    const status = await deleteName(list._id, data.name._id)
    if (status === 204) {
      console.log('removing and fetching data for ', currentBoard._id)
      await fetchBoard(currentBoard._id)
    }
    setIsInList(
      currentBoardOwnedList?.names.some(
        (item) => item.value === data.name.value
      )
    )
  }



  return (
    <>
      <div>
        {data.name.value}
        {isInList ? (
          <button onClick={handleDelete}>REMOVE</button>
        ) : (
          // TODO - remove 42 test only
          <button onClick={handleAdd}>ADD</button>
        )}
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
