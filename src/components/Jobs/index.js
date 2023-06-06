import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FiltersGroup from '../FiltersGroup'
import JobsList from '../JobsList'
import FailureView from '../FailureView'

const apiFetchStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentTypeFilters: [],
    minSalary: '',
    apiStatus: apiFetchStatus.initial,
    jobsList: 'INITIAL',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiFetchStatus.inProgress})
    const {searchInput, employmentTypeFilters, minSalary} = this.state
    const employmentType = employmentTypeFilters.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minSalary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobsList, apiStatus: apiFetchStatus.success})
    } else {
      this.setState({apiStatus: apiFetchStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsData()
  }

  onPressEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onFilterByEmploymentType = employmentTypeId => {
    const {employmentTypeFilters} = this.state
    if (employmentTypeFilters.includes(employmentTypeId) === false) {
      employmentTypeFilters.push(employmentTypeId)
      this.setState({employmentTypeFilters}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employmentTypeFilters: prevState.employmentTypeFilters.filter(
            id => id !== employmentTypeId,
          ),
        }),
        this.getJobsData,
      )
    }
  }

  onFilterBySalaryRange = filteredSalaryRange => {
    this.setState({minSalary: filteredSalaryRange}, this.getJobsData)
  }

  renderMobileSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="mobile-search-bar-container">
        <input
          type="search"
          className="search-input-field"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onPressEnterKey}
        />
        <button
          className="search-icon-button"
          type="button"
          data-testid="searchButton"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderDesktopSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="desktop-search-bar-container">
        <input
          type="search"
          className="search-input-field"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onPressEnterKey}
        />
        <button
          className="search-icon-button"
          type="button"
          data-testid="searchButton"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <div className="failure-view-content">
        <img
          className="failure-view-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <p className="failure-view-msg">Oops! Something Went Wrong</p>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.getJobsData}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobCardsSection = () => {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case apiFetchStatus.inProgress:
        return this.renderLoader()
      case apiFetchStatus.success:
        return <JobsList jobsList={jobsList} />
      case apiFetchStatus.failure:
        return <FailureView retryRequest={this.getJobsData} />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="jobs-page-body">
            <div className="profile-and-filters-section">
              {this.renderMobileSearchBar()}
              <ProfileCard />
              <FiltersGroup
                filterByEmploymentType={this.onFilterByEmploymentType}
                filterBySalaryRange={this.onFilterBySalaryRange}
              />
            </div>
            <div className="jobs-list-section">
              {this.renderDesktopSearchBar()}
              {this.renderJobCardsSection()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
