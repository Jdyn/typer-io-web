import React, { Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const DashboardProfileHeader = props => {
  const { initClient, username, classes } = props;
  var input = null;

  const handleSubmit = event => {
    event.preventDefault();
    const username = input.value;
    initClient(username);
  };

  return (
    <Fragment>
      <form onSubmit={event => handleSubmit(event)} className={classes.container}>
        <h2 className={classes.title}>{username}</h2>
        <input
          className={classes.input}
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

DashboardProfileHeader.propTypes = {};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: "275px",
    },
    title: {

    },
  input: {

  }
};

export default injectSheet(styles)(DashboardProfileHeader);
