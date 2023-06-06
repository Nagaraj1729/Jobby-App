import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-page">
      <div className="home-page-body">
        <div className="body-content">
          <h1 className="home-page-heading">
            Find The Job That Fits Your LIfe
          </h1>
          <p className="home-page-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
