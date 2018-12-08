import React from "react";
import injectSheet from "react-jss";

const CommonPaper = props => {
  const { classes, children } = props;

  return <div className={classes.paper}>{children}</div>;
};

const styles = theme => ({
  paper: {
    display: "flex",
    width: props => props.width ? props.width : "100%",
    flexDirection: "column",
    position: "relative",
    margin: 15,
    padding: props => props.padding ? props.padding : '0px',
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    maxWidth: props => props.maxWidth,
    boxShadow: '0px 5px 30px 5px rgba(50,50,93,.25)',
}
});

export default injectSheet(styles)(CommonPaper);
