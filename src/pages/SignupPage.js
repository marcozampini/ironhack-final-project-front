import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

function SignupPage(props) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { email, username, password }

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login')
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage
        setErrorMessage(errorDescription)
      })
  }

  return (
    <>
      <h1>Sign up</h1>
      <div className="main-content">
        <form onSubmit={handleSignupSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <button type="submit">
            <i className="fa-solid fa-user-plus"></i> Sign up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="main-content">
        <p>
          Already have an account? <Link to={'/login'}>Log in</Link>.
        </p>
      </div>
    </>
  )
}

export default SignupPage
