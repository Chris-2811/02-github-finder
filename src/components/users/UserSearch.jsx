import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/GithubContext'
import { searchUsers } from '../../context/github/GithubActions'

function UserSearch() {
  const [text, setText] = useState('')

  const { users, dispatch } = useContext(GithubContext)

  function handleChange(e) {
    setText(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (text === '') {
      alert('please enter something')
    } else {
      dispatch({
        type: 'SET_LOADING',
      })
      const users = await searchUsers(text)
      dispatch({ type: 'GET_USERS', payload: users })

      setText('')
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <form onSubmit={handleSubmit}>
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-lg bg-gray-200 text-black pr-40 w-full"
            value={text}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="rounded-l-none btn-lg absolute right-0 top-0 w-36 btn"
          >
            go
          </button>
        </div>
      </form>
      {users.length > 0 && (
        <div>
          <button
            onClick={() =>
              dispatch({
                type: 'CLEAR_USERS',
              })
            }
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
