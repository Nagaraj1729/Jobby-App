import {withRouter} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-job-card-header">
        <img
          className="similar-job-card-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-job-card-title">{title}</h1>
          <p className="similar-job-card-rating">
            <AiFillStar className="similar-job-card-star-icon" />
            {rating}
          </p>
        </div>
      </div>

      <h1 className="similar-job-card-side-heading">Description </h1>

      <p className="similar-job-card-description">{jobDescription}</p>
      <div className="similar-job-card-location-employment-type-container">
        <p className="similar-job-card-specification">
          <MdLocationOn className="similar-job-card-specification-icon" />
          {location}
        </p>
        <p className="similar-job-card-specification">
          <BsFillBriefcaseFill className="similar-job-card-specification-icon" />
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default withRouter(SimilarJobCard)
