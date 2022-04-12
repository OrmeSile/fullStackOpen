// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {

  // const notification = useSelector(state => state.notification)

  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div
      style={notification
        ? style
        : { ...style, display: 'none' }}
    >
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification