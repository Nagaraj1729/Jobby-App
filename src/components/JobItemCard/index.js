import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-card-item-link">
      <li className="job-item-card">
        <div className="job-card-header">
          <img
            className="company-logo-img"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="rating-star-icon" />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-specifications-container">
          <div className="location-employment-type-container">
            <p className="job-specification-detail">
              <MdLocationOn className="job-specification-icon" />
              {location}
            </p>
            <p className="job-specification-detail">
              <BsFillBriefcaseFill className="job-specification-icon" />
              {employmentType}
            </p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-hr-line" />
        <h1 className="job-card-description-label">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItemCard
