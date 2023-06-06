import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="desktop-nav-link-ite">
          <img
            className="nav-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="mobile-nav-items-container">
          <li className="nav-list-item">
            <Link to="/">
              <AiFillHome className="nav-item-icon" />
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="nav-item-icon" />
            </Link>
          </li>
          <li className="nav-list-item">
            <button
              className="mobile-logout-button"
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
        <div className="desktop-nav-items-container">
          <div>
            <Link to="/" className="desktop-nav-link-item">
              Home
            </Link>
            <Link to="/jobs" className="desktop-nav-link-item">
              Jobs
            </Link>
          </div>
          <button
            type="button"
            className="desktop-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
