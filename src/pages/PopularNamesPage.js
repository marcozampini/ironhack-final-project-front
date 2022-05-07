import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

const API_URL = process.env.REACT_APP_API_URL

const PopularNamesPage = () => {
  const { cca3 } = useParams()
  const { limit } = useParams()
  let popularNamesNumber
  const [currentCountryData, setCurrentCountryData] = useState(undefined)

  if (isNaN(limit)) {
    popularNamesNumber = 10
  } else {
    popularNamesNumber = limit
  }

  const getCountry = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/names/tops/${cca3}?limit=${popularNamesNumber}`
      )
      setCurrentCountryData(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [cca3, popularNamesNumber])

  useEffect(() => {
    getCountry()
  }, [getCountry])

  return (
    <>
      {currentCountryData && (
        <>
          <h1>
            Popular names in {currentCountryData.country.name.common}{' '}
            <img
              src={`https://countryflagsapi.com/svg/${cca3}`}
              alt={`Flag of ${currentCountryData.country.name.common}`}
            />
          </h1>
          <h2>
            <img
              src={`https://countryflagsapi.com/svg/${cca3}`}
              alt={`Flag of ${currentCountryData.country.name.common}`}
            />{' '}
            The {popularNamesNumber} most popular names
          </h2>
          <div className="main-content">
            <p>
              <Link to={`/names/popular/${cca3}/10`}>
                The 10 most popular names
              </Link>{' '}
              |{' '}
              <Link to={`/names/popular/${cca3}/50`}>
                The 50 most popular names
              </Link>{' '}
              |{' '}
              <Link to={`/names/popular/${cca3}/100`}>
                The 100 most popular names
              </Link>{' '}
              |{' '}
              <Link to={`/names/popular/${cca3}/1000`}>
                The 1000 most popular names
              </Link>
            </p>
          </div>
          <div className="lists">
            <div className="list">
              <h2>
                <i className="fa-solid fa-venus"></i> Girls
              </h2>
              <ul>
                {currentCountryData.topGirlsNames.map((girlsName, index) => {
                  return (
                    <li key={girlsName._id} className="name">
                      <Link to={'/names/' + girlsName.name._id}>
                        {index + 1}.{' '}
                        {capitalizeFirstLetter(girlsName.name.value)}
                      </Link>

                      <Link
                        className="button"
                        to={'/names/' + girlsName.name._id}
                      >
                        <i className="fa-solid fa-circle-info"></i>{' '}
                        <span className="info-text">Info</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="list">
              <h2>
                <i className="fa-solid fa-mars"></i> Boys
              </h2>
              <ul>
                {currentCountryData.topBoysNames.map((boysName, index) => {
                  return (
                    <li key={boysName._id} className="name">
                      <Link to={'/names/' + boysName.name._id}>
                        {index + 1}.{' '}
                        {capitalizeFirstLetter(boysName.name.value)}
                      </Link>

                      <Link
                        className="button"
                        to={'/names/' + boysName.name._id}
                      >
                        <i className="fa-solid fa-circle-info"></i>{' '}
                        <span className="info-text">Info</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PopularNamesPage
