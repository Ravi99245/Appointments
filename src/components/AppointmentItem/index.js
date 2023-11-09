import './index.css'
import {format} from 'date-fns'

const AppoointmentItem = props => {
  const {Appointment, onChangeStarImage} = props
  const {title, date, myDate, isStarred, id} = Appointment
  const originalDate = new Date(date)
  const finalDate = format(originalDate, 'dd MMMM yyyy, EEEE')
  console.log(id)

  const changeImage = () => {
    onChangeStarImage(id)
  }

  const starredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const newDate = finalDate.toString()
  console.log(isStarred, newDate)

  return (
    <li className="list-item">
      <div className="top-section">
        <h1 className="heading2">{title}</h1>
        <button
          className="satrButton"
          type="button"
          onClick={changeImage}
          data-testid="star"
        >
          <img src={starredImage} className="star" alt="star" />
        </button>
      </div>
      <p className="time">Date : {newDate}</p>
    </li>
  )
}

export default AppoointmentItem
