import React, { Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const propTypes = {
  initClient: PropTypes.func.isRequired,
  username: PropTypes.string
};

const DashboardProfileHeader = props => {
  const { initClient, username, classes } = props;
  var input = null;

  const handleSubmit = event => {
    event.preventDefault();

    if (input.value !== username) {
      const name = input.value;
      if (name == null) {
        const name = "nullclient";
        initClient(name);
      } else {
        initClient(name);
      }
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={event => handleSubmit(event)}
        className={classes.container}
      >
        <input
          className={classes.nameInput}
          placeholder="name"
          type="text"
          ref={element => {
            input = element;
          }}
        />
      </form>
    </Fragment>
  );
};

DashboardProfileHeader.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    maxWidth: "275px",
    width: "275px"
  },
  nameInput: {
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    maxWidth: "165px",
    margin: "25px auto 0 auto",
    height: "60px",
    padding: "10px",
    borderRadius: 8,
    // boxShadow: "0px 0px 20px 0px rgba(50,50,93,.25) inset",
    fontSize: 24,
    border: "none",
    outline: "none",

    "&:focus": {
      backgroundColor: theme.primaryWhite,
    }
  }
});

export default injectSheet(styles)(DashboardProfileHeader);
