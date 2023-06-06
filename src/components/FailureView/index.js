import './index.css'

const FailureView = props => {
  const onClickRetryButton = () => {
    const {retryRequest} = props
    retryRequest()
  }
  return (
    <div className="job-details-failure-view-container">
      <img
        className="job-details-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-details-failure-msg">Oops! Something Went Wrong</h1>
      <p className="job-details-failure-caption">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-details-retry-button"
        type="button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )
}

export default FailureView
