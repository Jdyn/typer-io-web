import React from "react";
import withStyles from "react-jss";

const ContextDisplay = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>

    </div>
  );
};

const styles = theme => ({
  container: {
      backgroundColor: theme.primaryWhite,
      boxShadow: "0 1px 40px rgba(50,50,93,.25)",
      height: "100%",
      borderRadius: 8,
      zIndex: 150
  }
});
export default withStyles(styles, { injectTheme: true })(ContextDisplay);
