import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth.context'
const API_URL = process.env.REACT_API_URL

function LoginPage(props) {
  const { storeToken, authenticateUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { email, password }

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        //console.log('JWT RETURNED', response.data)

        storeToken(response.data.authToken)
        authenticateUser()

        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't you have an account?</p>
      <Link to={'/signup'}>Sign up</Link>
    </div>
  )
}

export default LoginPage
