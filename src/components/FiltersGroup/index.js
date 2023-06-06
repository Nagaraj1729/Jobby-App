import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const employmentFilterItem = employmentType => {
    const {label, employmentTypeId} = employmentType

    const onToggleEmploymentTypeCheckbox = event => {
      const {filterByEmploymentType} = props
      filterByEmploymentType(event.target.id)
    }
    return (
      <li className="filter-item" key={employmentTypeId}>
        <input
          className="checkbox-input"
          type="checkbox"
          id={employmentTypeId}
          onChange={onToggleEmploymentTypeCheckbox}
        />
        <label className="filter-label" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }

  const renderEmploymentTypeFiltersGroup = () => (
    <div className="filter-group-container">
      <h1 className="filter-group-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(employmentType =>
          employmentFilterItem(employmentType),
        )}
      </ul>
    </div>
  )

  const salaryRangeFilterItem = salaryRange => {
    const {label, salaryRangeId} = salaryRange

    const onSelectSalaryRangeFilter = event => {
      const {filterBySalaryRange} = props
      filterBySalaryRange(event.target.id)
    }
    return (
      <li className="filter-item" key={salaryRangeId}>
        <input
          className="checkbox-input"
          type="radio"
          id={salaryRangeId}
          name="salaryRange"
          onChange={onSelectSalaryRangeFilter}
        />
        <label className="filter-label" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  const renderSalaryRangeFiltersGroup = () => (
    <div className="filter-group-container">
      <h1 className="filter-group-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(salaryRange =>
          salaryRangeFilterItem(salaryRange),
        )}
      </ul>
    </div>
  )

  return (
    <div className="filters-section">
      {renderEmploymentTypeFiltersGroup()}
      {renderSalaryRangeFiltersGroup()}
    </div>
  )
}

export default FiltersGroup
