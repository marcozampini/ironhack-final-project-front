import React, { useContext } from 'react'
import { CurrentBoardContext } from '../../context/currentBoard.context'
import { NameSearchContext } from '../../context/nameSearch.context'
import Name from '../names/Name'
import './NameSearchModal.css'
import '../layout/Sidebar.css'

const NameSearchModal = ({ isVisible, toggleVisibility }) => {
  const {currentBoardOwnedList } = useContext(CurrentBoardContext);

  const {
    formData,
    handleChanges,
    handleSubmit,
    searchResults,
    isRequestSent,
  } = useContext(NameSearchContext)

  return (
    <>
      {isVisible && (
        <div className="modal-container">
          <div className="modal-content">
          {/* <div className="sidebar"> */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="q">Name</label>
              <input
                id="q"
                type="text"
                value={formData.q}
                onChange={handleChanges}
              />
              <input type="submit" value="search" />
            </form>
            <button className="modalCloseButton" onClick={toggleVisibility}>
              CLOSE
            </button>
            <div className="searchResults">
              {(searchResults.length &&
                searchResults
                  .sort((a, b) => a.name.value.length - b.name.value.length)
                  .map((item) => (
                    <Name
                      key={item._id}
                      data={item}
                      list={currentBoardOwnedList}
                    />
                  ))) ||
                (isRequestSent && 'No results...')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NameSearchModal
