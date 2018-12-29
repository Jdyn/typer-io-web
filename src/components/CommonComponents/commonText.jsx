import React from "react";
import injectSheet from "react-jss";

const styles = {
  commonText: {
    margin: "5px 0px 0px 0px",
    fontWeight: 400,
    fontSize: props => (props.fontSize ? props.fontSize : 17),
    color: props => (props.color ? props.color : "red"),
    lineHeight: "15px"
  }
};

const CommonText = injectSheet(styles)(({ classes, children }) => (
  <p className={classes.commonText}>{children}</p>
));

export default CommonText;
