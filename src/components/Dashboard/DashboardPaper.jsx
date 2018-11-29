import React, { Fragment } from "react";
import PropTypes from "prop-types";
import injectSheets from "react-jss";

const propTypes = {
  navigatePath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired
};

const DashboardPaper = props => {
  const { classes, children } = props;

  return <div className={classes.paper}>{children}</div>;
};

const styles = theme => ({
  paper: {
    display: "flex",
    width: "100%",
    flex: [1, 1, "100%"],
    flexDirection: "column",
    position: "relative",
    margin: 15,
    // padding: "40px 40px 40px 40px",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    boxShadow: '0px 5px 30px 5px rgba(50,50,93,.25)',
}
});

DashboardPaper.propTypes = propTypes;

export default injectSheets(styles)(DashboardPaper);
