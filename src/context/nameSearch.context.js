import axios from 'axios'
import { createContext, useState } from 'react'
const API_URL = process.env.REACT_APP_API_URL

const NameSearchContext = createContext()

const savedToken = localStorage.getItem('authToken')

function NameSearchProviderWrapper(props) {
  const defaultFormData = {
    q: '',
    minlen: undefined,
    maxlen: undefined
  }
  const [searchResults, setSearchResults] = useState([])
  const [isRequestSent, setIsRequestSent] = useState(false)
  const [formData, setFormData] = useState(defaultFormData)

  async function handleSubmit(event) {
    // do not navigate the browser on form submit
    event.preventDefault()
    try {
      console.log('sending ->', formData);
      const { data } = await axios.get(`${API_URL}/names`, {
        params: formData,
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      setIsRequestSent(true)
      setSearchResults(data)
    } catch (error) {
      if (error.response.status != 400) {
        console.error(error)
      }
    }
  }

  function handleNameLenChange(minlen, maxlen) {
    const newFormData = { ...formData, minlen, maxlen }
    console.log('update len, new data', newFormData);
    setFormData(newFormData)
  }

  function handleQueryChange(event) {
    const { value } = event.target
    const newFormData = { ...formData, q: value }
    console.log('update query, new data', newFormData);
    setFormData(newFormData)
  }

  function resetSearch() {
    setFormData(defaultFormData)
    setSearchResults([])
    setIsRequestSent(false)
  }

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
