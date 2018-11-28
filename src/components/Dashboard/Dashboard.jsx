import PropTypes from "prop-types";
import React from "react";
import DashboardPlay from "./DashboardPlay";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  initClient: PropTypes.func.isRequired
};

export const Dashboard = props => {
  const { socket, client, initClient, classes } = props;
  var input = null;

  const handleSubmit = event => {
    event.preventDefault();
    const username = input.value;
    initClient(username);
  };

  return (

    // <div className={classes.dashboard}>
    //   <DashboardSelect username={client.username} />
    //   <div>{client.username}</div>
    //   <form onSubmit={event => handleSubmit(event)}>
    //     <input
    //       placeholder="Enter Username"
    //       type="text"
    //       ref={element => {
    //         input = element;
    //       }}
    //     />
    //     <button>Submit</button>
    //   </form>
    // </div>
  );
};

Dashboard.propTypes = propTypes;

const styles = theme => ({
  
});

export default injectSheet(styles)(Dashboard);
