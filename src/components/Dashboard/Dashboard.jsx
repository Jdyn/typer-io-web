import PropTypes from "prop-types";
import React, { Fragment } from "react";
import DashboardSelect from "./DashboardSelect";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  initClient: PropTypes.func.isRequired
};

export const Dashboard = props => {
  const { socket, client, initClient } = props;
  var input = null;

  const handleSubmit = event => {
    event.preventDefault();
    const username = input.value;
    initClient(username);
  };

  return (
    <Fragment>
      <DashboardSelect username={client.username} />
      <h1>{client.username}</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          placeholder="Enter Username"
          type="text"
          ref={element => {
            input = element;
          }}
        />
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

Dashboard.propTypes = propTypes;
