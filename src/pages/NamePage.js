import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import nthNumber from '../utils/nthNumber'

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
                    Popularity in{' '}
                    <Link to={`/names/popular/${country.cca3}`}>
                      {country.name.common}{' '}
                      <img
                        src={`https://countryflagsapi.com/svg/${country.cca3}`}
                        alt={`Flag of ${country.name.common}`}
                      />
                    </Link>
                  </h2>
                  {country.stats.map((stat) => {
                    return (
                      <>
                        {stat.gender === 'm' ? (
                          <>
                            <h3>
                              <i className="fa-solid fa-mars"></i> Boys
                            </h3>
                            {stat.count} boys have been named{' '}
                          </>
                        ) : (
                          <>
                            <h3>
                              <i className="fa-solid fa-venus"></i> Girls
                            </h3>
                            {stat.count} girls have been named{' '}
                          </>
                        )}
                        <strong>
                          {capitalizeFirstLetter(currentName.value)}
                        </strong>{' '}
                        in 2020.
                        <p>
                          {capitalizeFirstLetter(currentName.value)} is ranked{' '}
                          {nthNumber(stat.rank)} for baby{' '}
                          {stat.gender === 'm' ? <>boys</> : <>girls</>} in{' '}
                          {country.name.common}.
                        </p>
                      </>
                    )
                  })}
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
