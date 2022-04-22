import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

const API_URL = process.env.REACT_APP_API_URL

const PopularNamesPage = () => {
  const { cca3 } = useParams()
  const [currentCountryData, setCurrentCountryData] = useState(undefined)
  const popularNamesNumber = 20

  const getCountry = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/names/tops/${cca3}?limit=${popularNamesNumber}`
      )
      setCurrentCountryData(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [cca3])

  useEffect(() => {
    getCountry()
  }, [getCountry])

  return (
    <>
      <h1>Popular names</h1>
      {currentCountryData && (
        <>
          <h2>
            <img
              src={`https://countryflagsapi.com/svg/${cca3}`}
              alt={`Flag of ${currentCountryData.country.name.common}`}
            />
            {popularNamesNumber} most popular names in{' '}
            {currentCountryData.country.name.common}
          </h2>
          <h3>Boys</h3>
          <ul>
            {currentCountryData.topBoysNames.map((boysName) => {
              return (
                <li key={boysName._id}>
                  <Link to={'/names/' + boysName.name._id}>
                    {capitalizeFirstLetter(boysName.name.value)}
                  </Link>
                </li>
              )
            })}
          </ul>
          <h3>Girls</h3>
          <ul>
            {currentCountryData.topGirlsNames.map((girlsName) => {
              return (
                <li key={girlsName._id}>
                  <Link to={'/names/' + girlsName.name._id}>
                    {capitalizeFirstLetter(girlsName.name.value)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </>
  )
}

export default PopularNamesPage
