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

          <div className="lists">
            {currentName.countries.map((country) => {
              return (
                <div className="list" key={country.cca3}>
                  <h2>
                    <img
                      src={`https://countryflagsapi.com/svg/${country.cca3}`}
                      alt={`Flag of ${country.name.common}`}
                    />{' '}
                    Popularity in {country.name.common}{' '}
                    <img
                      src={`https://countryflagsapi.com/svg/${country.cca3}`}
                      alt={`Flag of ${country.name.common}`}
                    />
                  </h2>
                  {country.fCount > 0 && (
                    <p>
                      <i className="fa-solid fa-venus"></i> {country.fCount}{' '}
                      girls have been named{' '}
                      {capitalizeFirstLetter(currentName.value)} in 2020.
                    </p>
                  )}
                  {country.mCount > 0 && (
                    <p>
                      <i className="fa-solid fa-mars"></i> {country.mCount} boys
                      have been named {capitalizeFirstLetter(currentName.value)}{' '}
                      in 2020.
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default NamePage
