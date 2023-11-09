import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppoointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    myDate: '',
    isButtonToggled: false,
    appointmentsList: [],
    originalList: [],
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      originalList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
      myDate: '',
    }))
  }

  changeInput = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    const dateObject = new Date(event.target.value)
    const formattedDate = format(dateObject, 'dd MMMM yyyy, EEEE')
    this.setState({
      date: event.target.value,
      myDate: formattedDate,
    })
  }

  onChangeStarImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
      originalList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  changeStarredList = () => {
    const {appointmentsList, isButtonToggled, originalList} = this.state
    const newList = appointmentsList.filter(
      eachItem => eachItem.isStarred === true,
    )

    this.setState(prevState => ({isButtonToggled: !prevState.isButtonToggled}))

    if (!isButtonToggled) {
      this.setState({appointmentsList: newList})
    } else {
      this.setState({appointmentsList: originalList})
      console.log(originalList)
    }
  }

  render() {
    const {title, date, myDate, appointmentsList, isButtonToggled} = this.state
    console.log('currentDate :', myDate)
    const className = isButtonToggled ? 'starButton' : ''

    return (
      <div className="bg-container">
        <div className="container">
          <div className="input-container">
            <form className="appointmentForm" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="inputElement" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                value={title}
                onChange={this.changeInput}
                placeholder="Title"
              />
              <label htmlFor="inputElement" className="label">
                DATE
              </label>
              <input
                type="date"
                className="input"
                value={date}
                onChange={this.changeDate}
                placeholder="dd/mm/yyyy"
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="appointments-container">
            <div className="top">
              <h1 className="heading1">Appointments</h1>
              <button
                className={`button1 ${className}`}
                type="button"
                onClick={this.changeStarredList}
              >
                Starred
              </button>
            </div>
            <ul className="appointments">
              {appointmentsList.map(eachItem => (
                <AppoointmentItem
                  key={eachItem.id}
                  Appointment={eachItem}
                  onChangeStarImage={this.onChangeStarImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
