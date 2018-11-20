import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const Loader = ({ isLoading }) => {
  if (isLoading) {
    return <div> Things are loading </div>
  }

  return <div />
}

Loader.propTypes = propTypes

export default Loader
