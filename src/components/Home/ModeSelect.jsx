import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ModeSelect extends Component {
  componentDidMount() {}

  render() {
    const options = ["Play", "Solo", "Friends"];

    return (
      <div>
        {this.props.username !== null
          ? options.map(option => (
              <Link to="/play" key={option}>
                <button>{option}</button>
              </Link>
            ))
          : options.map(option => <button key={option}>{option}</button>)}
      </div>
    );
  }
}
