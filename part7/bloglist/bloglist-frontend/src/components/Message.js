import { useSelector } from 'react-redux'

const Message = () => {
  const { message, status } = useSelector((store) => store.notification)
  console.log(message, status)
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const successStyle = { ...errorStyle, color: 'green' }

  return (
    <div>
      <p
        className="message"
        style={status === 'error' ? errorStyle : successStyle}
      >
        {message}
      </p>
    </div>
  )
}

export default Message
