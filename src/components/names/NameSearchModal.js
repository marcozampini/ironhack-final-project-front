import React, { useContext, useState } from 'react'
import { CurrentBoardContext } from '../../context/currentBoard.context'
import { NameSearchContext } from '../../context/nameSearch.context'
import Name from '../names/Name'
import './NameSearchModal.css'
import 'antd/dist/antd.min.css'
import { Slider, Switch } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

const NameSearchModal = ({ isVisible, toggleVisibility }) => {
  const defaultMinLen = 4
  const defaultMaxLen = 6
  const { currentBoardOwnedList } = useContext(CurrentBoardContext)
  const [disabled, setDisabled] = useState(true)

  const toggleDisable = (disabled) => {
    setDisabled(!disabled)
    if (!disabled) {
      handleNameLenChange(undefined, undefined)
    } else {
      handleNameLenChange(defaultMinLen, defaultMaxLen)
    }
  }
  const handlerSliderChange = (value) => {
    handleNameLenChange(value[0], value[1])
  }

  const {
    formData,
    handleNameLenChange,
    handleQueryChange,
    handleSubmit,
    searchResults,
    isRequestSent,
  } = useContext(NameSearchContext)

  return (
    <>
      {isVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="searchForm">
              <form onSubmit={handleSubmit}>
                <label htmlFor="q">Name</label>
                <input
                  id="q"
                  type="text"
                  value={formData.q}
                  onChange={handleQueryChange}
                />

                <div>
                  Limit length of names
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={toggleDisable}
                    size="small"
                    checked={!disabled}
                  />
                  <Slider
                    min={2}
                    max={12}
                    draggableTrack={false}
                    range
                    defaultValue={[defaultMinLen, defaultMaxLen]}
                    value={[
                      formData.minlen || defaultMinLen,
                      formData.maxlen || defaultMaxLen,
                    ]}
                    onChange={handlerSliderChange}
                    disabled={disabled}
                  />
                </div>

                <input type="submit" value="search" />
              </form>
            </div>
            <button className="modalCloseButton" onClick={toggleVisibility}>
              Close
            </button>
            <div className="searchResults">
              <ul className="list">
                {(searchResults.length &&
                  searchResults
                    .sort((a, b) => a.name.value.length - b.name.value.length)
                    .map((item) => {
                      console.log('ITEM', item)
                      return (
                        <li key={item._id}>
                          <Name
                            name={item.name.value}
                            nameId={item._id}
                            weight={item?.weight}
                            list={currentBoardOwnedList}
                          />
                        </li>
                      )
                    })) || (
                  <div className="resultItem">
                    {isRequestSent && 'No results...'}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NameSearchModal
