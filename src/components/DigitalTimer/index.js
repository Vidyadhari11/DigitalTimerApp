// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStart: false, secondsTime: 0, minutesTime: 25}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  incrementTimeInSeconds = () => {
    const {minutesTime, secondsTime} = this.state
    const isTimerCompleted = secondsTime === minutesTime * 60
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isStart: false})
    } else {
      this.setState(prevState => ({secondsTime: prevState.secondsTime + 1}))
    }
  }

  onStartOrPauseButton = () => {
    const {minutesTime, secondsTime, isStart} = this.state
    const isTimerCompleted = secondsTime === minutesTime * 60
    if (isTimerCompleted) {
      this.setState({secondsTime: 0})
    }
    if (isStart) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({
      isStart: !prevState.isStart,
    }))
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState({isStart: false, secondsTime: 0, minutesTime: 25})
  }

  onDecreaseTime = () => {
    const {minutesTime} = this.state
    if (minutesTime > 1) {
      this.setState(prevState => ({minutesTime: prevState.minutesTime - 1}))
    }
  }

  onIncreaseTime = () => {
    this.setState(prevState => ({minutesTime: prevState.minutesTime + 1}))
  }

  getTimeFormat = () => {
    const {minutesTime, secondsTime} = this.state
    const totalRemainingSeconds = minutesTime * 60 - secondsTime
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isStart, minutesTime, secondsTime} = this.state
    const imageUrl = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altIcon = isStart ? 'pause icon' : 'play icon'
    const option = isStart ? 'Pause' : 'Start'
    const isButtonsDisabled = secondsTime > 0
    const labelText = isStart ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card-container">
          <div className="count-container">
            <div className="time-container">
              <h1 className="time">{this.getTimeFormat()}</h1>
              <p className="pause">{labelText}</p>
            </div>
          </div>
          <div className="time-set-container">
            <div className="options-container">
              <button
                className="button"
                type="button"
                onClick={this.onStartOrPauseButton}
              >
                <img src={imageUrl} alt={altIcon} className="icon-image" />
                <p className="title">{option}</p>
              </button>
              <button
                className="button title"
                type="button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon-image"
                />
                <p className="title">Reset</p>
              </button>
            </div>
            <div className="timer-limit-controller-container">
              <p className="limit">Set Timer Limit</p>
              <div className="time-limit-container">
                <button
                  className="limit-btn"
                  disabled={isButtonsDisabled}
                  type="button"
                  onClick={this.onDecreaseTime}
                >
                  -
                </button>
                <div className="limit-label-and-value-container">
                  <p className="count">{minutesTime}</p>
                </div>
                <button
                  className="limit-btn"
                  type="button"
                  disabled={isButtonsDisabled}
                  onClick={this.onIncreaseTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
