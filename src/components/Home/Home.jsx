import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import ModeSelect from "./ModeSelect";

const defaultProps = {};

const propTypes = {};

class Home extends Component {
  constructor(props) {
    super(props);
    this.input = null;
  }

  handleSubmit = event => {
    if (event) event.preventDefault();
    const username = this.input.value;
    console.log(username);
    this.props.initClient(username);
  };

  render() {
    return (
      <Fragment>
        <ModeSelect username={this.props.client.username} establishSocket={this.props.establishSocket} />
        <h1>{this.props.client.username}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Your name"
            type="text"
            ref={element => {
              this.input = element;
            }}
          />
          <button>Submit</button>
        </form>
      </Fragment>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
