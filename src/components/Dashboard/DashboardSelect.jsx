import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const propTypes = {
  username: PropTypes.string.isRequired
}
  
const DashboardSelect = props => {
  const { username } =  props
  const options = ["Play", "Solo", "Friends"];

  return (
    <div>
    {username !== null
      ? options.map(option => (
          <Link to="/play" key={option}>
            <button>{option}</button>
          </Link>
        ))
      : options.map(option => <button key={option}>{option}</button>)}
  </div>
  )
}

DashboardSelect.propTypes = propTypes;
export default DashboardSelect
