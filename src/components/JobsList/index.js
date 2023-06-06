import './index.css'
import JobItemCard from '../JobItemCard'

const JobsList = props => {
  const {jobsList} = props

  const renderJobsList = () => (
    <ul className="jobs-list-container">
      {jobsList.map(job => (
        <JobItemCard key={job.id} jobDetails={job} />
      ))}
    </ul>
  )

  const renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        className="no-jobs-view-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-view-msg">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  if (jobsList.length === 0) {
    return renderNoJobsView()
  }
  return renderJobsList()
}

export default JobsList
