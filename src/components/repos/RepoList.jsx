import React from 'react'
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

function RepoList({ repos }) {
  return (
    <div className="card bg-neutral">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItem repo={repo} />
        ))}
      </div>
    </div>
  )
  RepoList.propTypes = {
    repos: PropTypes.array.isRequired,
  }
}

export default RepoList
