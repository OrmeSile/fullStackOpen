import { useSelector } from 'react-redux'

const Message = () => {
  const { message, status } = useSelector((store) => store.notification)
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
  const hiddenStyle = { display: 'none' }
  let style

  if (status === 'error') {
    style = errorStyle
  }else if (status === 'ok') {
    style = successStyle
  }else if (status === 'hidden') {
    style = hiddenStyle
  }

  return (
    <div>
      <p
        className="message"
        style={style}
      >
        {message}
      </p>
    </div>
  )
}

export default Message
