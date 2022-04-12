import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Filter = (props) => {

  const handleChange = (event) => {
    const filterText = event.target.value
    props.setFilter(filterText)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func
}

const connectedFilter = connect(null, {setFilter})(Filter)
export default connectedFilter