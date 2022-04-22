import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

const API_URL = process.env.REACT_APP_API_URL

const NamePage = () => {
  const { nameId } = useParams()
  const [currentName, setCurrentName] = useState(undefined)

  const getName = useCallback(async () => {
    try {
      if (nameId) {
        const response = await axios.get(`${API_URL}/names/${nameId}`)
        console.log(response.data)
        setCurrentName(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }, [nameId])

  useEffect(() => {
    getName()
  }, [getName])

  return (
    <>
      <h1>Information about a name</h1>
      {currentName && (
        <>
          <h2>{capitalizeFirstLetter(currentName.value)}</h2>

          {currentName.countries.map((country) => {
            return (
              <div key={country.cca3}>
                <h3>
                  <img
                    src={`https://countryflagsapi.com/svg/${country.cca3}`}
                    alt={`Flag of ${country.name.common}`}
                  />
                  {country.name.common}
                </h3>
                <p>{country.fCount}</p>
                <p>{country.mCount}</p>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default NamePage
