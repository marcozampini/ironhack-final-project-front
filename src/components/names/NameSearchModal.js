import React, { useContext } from 'react'
import { NameSearchContext } from '../../context/nameSearch.context'
import Name from '../names/Name'
import './NameSearchModal.css'

const NameSearchModal = ({ isVisible, toggleVisibility }) => {
  const {
    formData,
    handleChanges,
    handleSubmit,
    searchResults,
    isRequestSent,
    currentBoard,
  } = useContext(NameSearchContext)

  return (
    <>
      {isVisible && (
        <div className="modal-container">
          <div className="modal-content">
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
                      list={currentBoard?.lists.find((l) => l.isOwner)}
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
