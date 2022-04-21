import axios from 'axios'
import { createContext, useCallback, useState } from 'react'
const API_URL = process.env.REACT_APP_API_URL

const NameSearchContext = createContext()


const defaultFormData = {
  q: '',
  minlen: undefined,
  maxlen: undefined,
}

function NameSearchProviderWrapper(props) {
  const [searchResults, setSearchResults] = useState([])
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [formData, setFormData] = useState(defaultFormData)

  async function handleSubmit(event) {
    // do not navigate the browser on form submit
    event.preventDefault()
    try {
      const savedToken = localStorage.getItem('authToken')
      const { data } = await axios.get(`${API_URL}/names`, {
        params: formData,
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setIsRequestSent(true)
      setSearchResults(data)
    } catch (error) {
      if (error.response.status !== 400) {
        console.error(error)
      }
    }
  }

  function handleNameLenChange(minlen, maxlen) {
    const newFormData = { ...formData, minlen, maxlen }
    setFormData(newFormData)
  }

  function handleQueryChange(event) {
    const { value } = event.target
    const newFormData = { ...formData, q: value }
    setFormData(newFormData)
  }

  const resetSearch = useCallback(() => {
    setFormData(defaultFormData)
    setSearchResults([])
    setIsRequestSent(false)
  }, [])

  return (
    <NameSearchContext.Provider
      value={{
        resetSearch,
        formData,
        handleNameLenChange,
        handleQueryChange,
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
