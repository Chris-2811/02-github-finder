import {
  FaCodepen,
  FaStore,
  FaUser,
  FaUserFriends,
  FaUsers,
} from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import GithubContext from '../context/github/GithubContext'
import { getUserAndRepos } from '../context/github/GithubActions'
import { useRef } from 'react'
import RepoList from '../components/repos/RepoList'

function User() {
  const { user, loading, repos, dispatch } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    const getUserData = async () => {
      const userData = await getUserAndRepos(params.login)
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData })
    }

    getUserData()
  }, [dispatch, params.login])

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog
  const myRef = useRef(null)

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back to search
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 md:gap-8 mb-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="card shadow-xl image-full rounded-lg">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end">
                <div className="card-title text-primary-content">
                  {name}
                </div>
                <p className="flex-grow-0 text-primary-content">{login}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="card-title text-2xl">
                {name}
                <div className="badge badge-success">{type}</div>
                {hireable && (
                  <div className="badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_bank"
                  ref={myRef}
                  className="btn btn-outline"
                >
                  Visit Github Profile
                </a>
              </div>
            </div>

            <div className="w-full bg-neutral stats shadow-md rounded-lg">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">Location</div>
                  <div className="stat-value text-lg">{location}</div>
                </div>
              )}

              {twitter_username && (
                <div className="stat">
                  <div className="stat-title  text-md">
                    Twitter Username
                  </div>
                  <div className="stat-value text-lg">
                    {twitter_username}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full py-5 mb-6 stats bg-neutral rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUsers className="text-3xl md:text-4xl" />
              </div>
              <div className="stat-title pr-5">Followers</div>
              <div className="stat-value text-3xl md:text-3xl pr-5">
                {followers}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaUser className="text-3xl md:text-4xl" />
              </div>
              <div className="stat-title pr-5">Following</div>
              <div className="stat-value pr-5 text-3xl lg:text-4xl md:text-3xl">
                {following}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaCodepen className="text-3xl md:text-4xl" />
              </div>
              <div className="stat-title pr-5">Puclic Repos</div>
              <div className="stat-value  pr-5 text-3xl md:text-3xl">
                {public_repos}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaStore className="text-3xl md:text-4xl" />
              </div>
              <div className="stat-title pr-5">Public Gists</div>
              <div className="stat-value  pr-5 text-3xl md:text-3xl">
                {public_gists}
              </div>
            </div>
          </div>
        </div>

        <RepoList repos={repos} />
      </div>
    </>
  )
}

export default User
