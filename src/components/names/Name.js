import { DislikeTwoTone } from '@ant-design/icons'
import { Rate } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BoardContext } from '../../context/board.context'
import { CurrentBoardContext } from '../../context/currentBoard.context'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import './Name.css'

const Name = ({ nameId, name, weight, displayMode, list }) => {
  const { currentBoard, currentBoardOwnedList, fetchBoard } =
    useContext(CurrentBoardContext)
  const [isInList, setIsInList] = useState(
    currentBoardOwnedList?.names.some((item) => item.value === name)
  )
  const [rating, setRating] = useState(weight > 3 ? 3 : weight)
  const [errorFetch, setErrorFetch] = useState('')
  const { addName, deleteName } = useContext(BoardContext)

  async function handleAdd() {
    setErrorFetch('')
    try {
      const { status, data: body } = await addName(list._id, nameId, rating)
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
      const { status, data: body } = await deleteName(list._id, nameId)
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

  /**
   * This function set name rating: -1 is a name they wish would not be given
      and 0 ~ 2 is a range for positive appreciation
   * @param {value} value rate given by user
   */
  function handleRateChange(value) {
    setRating(value)
  }

  useEffect(() => {
    setIsInList(
      currentBoardOwnedList?.names.some((item) => item.value === name)
    )
  }, [currentBoardOwnedList, name])

  return (
    <>
      {displayMode ? (
        <>
          <div className="resultItem">
            <div>
              <Link to={'/names/' + nameId}>{capitalizeFirstLetter(name)}</Link>
            </div>
            <div className="resultAction">
              {rating === -1 ? (
                <DislikeTwoTone
                  disabled={true}
                  twoToneColor={rating === -1 ? '#ff3d3d' : '#cccccc'}
                />
              ) : (
                <Rate
                  disabled={true}
                  allowClear={true}
                  value={rating === -1 ? 0 : rating}
                  count={3}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="resultItem">
          <div>
            <Link to={'/names/' + nameId}>{capitalizeFirstLetter(name)}</Link>
          </div>
          {isInList ? (
            <div className="resultAction">
              {rating === -1 ? (
                <DislikeTwoTone
                  disabled={true}
                  twoToneColor={rating === -1 ? '#ff3d3d' : '#cccccc'}
                />
              ) : (
                <Rate
                  disabled={true}
                  allowClear={true}
                  value={rating === -1 ? 0 : rating}
                  defaultValue={2}
                  count={3}
                />
              )}
              <button onClick={handleDelete}>
                <i className="fa-solid fa-circle-minus"></i>{' '}
                <span className="info-text">Remove</span>
              </button>
            </div>
          ) : (
            <div className="resultAction name">
              <DislikeTwoTone
                twoToneColor={rating === -1 ? '#ff3d3d' : '#cccccc'}
                onClick={() =>
                  rating === 0 ? handleRateChange(1) : handleRateChange(-1)
                }
              />
              <Rate
                allowClear={true}
                value={rating === -1 ? 0 : rating}
                defaultValue={2}
                count={3}
                onChange={handleRateChange}
              />
              <button onClick={handleAdd}>
                <i className="fa-solid fa-circle-plus"></i>{' '}
                <span className="info-text">Add</span>
              </button>
            </div>
          )}

          {errorFetch.length !== 0 && (
            <div>
              <p className="errorMessage">{errorFetch}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Name
