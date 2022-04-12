import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = (props) => {

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
Notification.propTypes = {
  notification: PropTypes.string
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification