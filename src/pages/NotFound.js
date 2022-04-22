import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h1>Sorry...</h1>
      <div className="main-content">
        <p>...this page leads nowhere.</p>
        <p>
          <Link to="/"> Let's get you back home!</Link>
        </p>
      </div>
    </>
  )
}

export default NotFound
