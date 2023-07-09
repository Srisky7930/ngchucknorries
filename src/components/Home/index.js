import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Random from '../Random'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jokesList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://api.chucknorris.io/jokes/categories'
    this.setState({
      apiStatus: apiStatusConstants.inProcess,
    })
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jokesList: data,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jokesList} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading"> Chuck Norries </h1>

        <div>
          <ul className="jokes-list">
            {jokesList.map(each => (
              <Random key={each} eachItem={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <h1> Failure... </h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader">
      <div>
        <Loader type="Bars" color="#ffffff" height="50" width="100" />
      </div>
    </div>
  )

  renderData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderData()}</div>
  }
}

export default Home
