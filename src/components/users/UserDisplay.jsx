import React, { useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

function UserDisplay() {
  const { users, loading } = useContext(GithubContext)

  console.log(users)

  if (!loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserDisplay
