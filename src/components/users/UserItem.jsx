import React from 'react'
import { Link } from 'react-router-dom'

function UserItem({ user: { login, avatar_url } }) {
  return (
    <div className="card compact side shadow text-neutral-content">
      <div className="card-body flex-row gap-8 items-center">
        <div>
          <div className="avatar">
            <div className="rounded-full w-14 h-14">
              <img src={avatar_url} alt="" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link
            className="text-opacity-40 text-base-content"
            to={`/user/${login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserItem
