import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class RandomJokes extends Component {
  state = {
    jokes: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRandomJokes()
  }

  getRandomJokes = async () => {
    const apiUrl = 'https://api.chucknorris.io/jokes/random?category=animal'
    this.setState({
      apiStatus: apiStatusConstants.inProcess,
    })
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        jokes: data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRandomJoke = () => {
    this.getRandomJokes()
  }

  renderSuccessView = () => {
    const {jokes} = this.state
    return (
      <div className="random-jokes-card">
        <h1 className="joke-text"> {jokes.value}</h1>
        <button
          type="button"
          className="next-joke"
          onClick={this.onClickRandomJoke}
        >
          Next Jokes
        </button>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <h1> Failure... </h1>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <div>
        <Loader type="Oval" color="#ffffff" height="50" width="100" />
      </div>
    </div>
  )

  renderRandomData = () => {
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
    return <>{this.renderRandomData()}</>
  }
}

export default RandomJokes
