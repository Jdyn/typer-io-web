import React, { Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const DashboardProfileHeader = props => {
  const { initClient, username, classes } = props;
  var input = null;

  const handleSubmit = event => {
    event.preventDefault();

    if (input.value !== username) {
      const name = input.value;
      initClient(name);
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
        {/* <button>Submit</button> */}
      </form>
    </Fragment>
  );
};

DashboardProfileHeader.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "275px",
    height: "100%",
    maxWidth: "275px"
  },
  nameInput: {
    flex: "100px",
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    margin: "0 25px 0 25px",
    height: "40px",
    padding: "10px",
    transition: "background-color .1s ease-in,color .1s ease-in",
    fontWeight: 400,
    fontSize: 17,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: theme.primaryWhite,
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 26,
    border: "none",
    outline: "none",

    "&:focus": {
      backgroundColor: "#f6f9fc",
      borderColor: "#e4effa",
      borderStyle: "solid"
    }
  }
});

export default injectSheet(styles)(DashboardProfileHeader);
