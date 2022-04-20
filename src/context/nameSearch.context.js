import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { CurrentBoardContext } from './currentBoard.context'
const API_URL = process.env.REACT_APP_API_URL

const NameSearchContext = createContext()

const savedToken = localStorage.getItem('authToken')

function NameSearchProviderWrapper(props) {
  const { currentBoard, currentBoardOwnedList } =
    useContext(CurrentBoardContext)

  const [searchResults, setSearchResults] = useState([])
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    q: '',
  })

  async function handleSubmit(event) {
    // do not navigate the browser on form submit
    event.preventDefault()
    console.log('FORM SUBMIT', formData)
    try {
      const { data } = await axios.get(`${API_URL}/names`, {
        params: formData,
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      console.log('RESULT OF AXIOS', data)
      setIsRequestSent(true)
      setSearchResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  function handleChanges(event) {
    const { value } = event.target
    const newFormData = { q: value }
    setFormData(newFormData)
  }

  function resetSearch() {
    setFormData({ q: '' })
    setSearchResults([])
    setIsRequestSent(false)
  }

  return (
    <NameSearchContext.Provider
      value={{
        resetSearch,
        formData,
        handleChanges,
        handleSubmit,
        searchResults,
        isRequestSent,
      }}
    >
      {props.children}
    </NameSearchContext.Provider>
  )
}

export { NameSearchProviderWrapper, NameSearchContext }
