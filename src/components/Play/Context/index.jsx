import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Header from "../../Common/Header";
import ContextDisplay from "./ContextDisplay";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Context = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        boxShadow="0 1px 40px rgba(50,50,93,.25)"
        fontSize={24}
        height="67px"
        backgroundColor={"#555abf"}
        padding="10px"
      >
        context
      </Header>
      <ContextDisplay />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    height: "50%",
    margin: "10px",

  }
};

Context.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Context);
