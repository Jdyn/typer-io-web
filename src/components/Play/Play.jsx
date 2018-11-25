import React, { Component, Fragment } from 'react'

export default class Play extends Component {
  constructor(props) {
    super(props)
    this.input = null
  }

  componentWillMount() {
    this.props.establishSocket(this.props.client.username)
  }

  render() {
    return (
      <Fragment>

      </Fragment>
    )
  }
}

