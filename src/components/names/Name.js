import { httpStatus } from 'http-status'
import { useContext, useState } from 'react'
import { BoardContext } from '../../context/board.context'

const Name = ({ data, list }) => {
  const [isInList, setIsInList] = useState(
    list?.names.some((item) => item.value === data.name.value)
  )
  const { addName, deleteName } = useContext(BoardContext)

  async function handleAdd() {
    const status = await addName(list._id, data.name, 42)
    if (status === 200) {
      setIsInList(true)
    }
  }

  async function handleDelete() {
    const status = await deleteName(list._id, data.name._id)
    if (status === 204) {
      setIsInList(false)
    }
  }

  return (
    <>
      <div>
        {data.name.value}
        {isInList ? (
          <button onClick={handleDelete}>
            REMOVE
          </button>
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
