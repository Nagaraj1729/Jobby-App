import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import FailureView from '../FailureView'

import './index.css'

const apiFetchStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiFetchStatus.initial,
    jobDetails: 'INITIAL',
    similarJobs: 'INITIAL',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiFetchStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = {
        id: data.job_details.id,
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }

      const similarJobs = data.similar_jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        title: job.title,
        rating: job.rating,
      }))

      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiFetchStatus.success,
      })
    } else {
      this.setState({apiStatus: apiFetchStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSimilarJobsSection = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-section">
        <h1 className="similar-jobs-section-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      title,
      companyLogoUrl,
      rating,
      employmentType,
      location,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobDetails
    const renderSkillsList = () => {
      const {skills} = jobDetails
      return (
        <ul className="skills-list-container">
          {skills.map(skill => (
            <li key={skill.name} className="skill-item">
              <img
                className="skill-image"
                src={skill.imageUrl}
                alt={skill.name}
              />
              <p className="skill-name">{skill.name}</p>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <>
        <div className="job-details-card">
          <div className="job-details-card-header">
            <img
              className="job-details-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-details-card-title">{title}</h1>
              <p className="job-details-card-rating">
                <AiFillStar className="job-details-card-star-icon" />
                {rating}
              </p>
            </div>
          </div>
          <div className="job-details-card-specifications-container">
            <div className="location-employment-type-container">
              <p className="job-details-card-specification">
                <MdLocationOn className="job-details-card-specification-icon" />
                {location}
              </p>
              <p className="job-details-card-specification">
                <BsFillBriefcaseFill className="job-details-card-specification-icon" />
                {employmentType}
              </p>
            </div>
            <p className="job-details-card-package-per-annum">
              {packagePerAnnum}
            </p>
          </div>
          <div className="description-label-visit-link-container">
            <h1 className="job-details-card-side-heading">Description </h1>
            <a
              href={companyWebsiteUrl}
              target="_"
              className="company-website-link"
            >
              Visit <FiExternalLink className="visit-link-icon" />
            </a>
          </div>
          <p className="job-details-card-description">{jobDescription}</p>
          <h1 className="job-details-card-side-heading">Skills</h1>
          {renderSkillsList()}
          <h1 className="job-details-card-side-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-details-card-description">
              {lifeAtCompany.description}
            </p>
            <img
              className="life-at-company-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        {this.renderSimilarJobsSection()}
      </>
    )
  }

  renderPageContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiFetchStatus.inProgress:
        return this.renderLoadingView()
      case apiFetchStatus.success:
        return this.renderJobDetails()
      case apiFetchStatus.failure:
        return <FailureView retryRequest={this.getJobItemDetails} />

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detailed-view-page">
          <div className="job-details-page-body">
            {this.renderPageContent()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
