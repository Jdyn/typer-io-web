import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Navigator from "./Navigator";
import Banner from "../reusable/Banner";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostForm = props => {
  const { classes, view } = props;

  return (
    <div className={classes.container}>
      <Banner>Forum</Banner>
      <Navigator view={view} />
      <textarea
        className={classes.text}
        maxLength="100"
        style={{ height: "75px" }}
        placeholder="The title of your post."
      />
      <textarea
        className={classes.text}
        style={{ height: "400px" }}
        placeholder="The contents of your post."
      />
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    flexGrow: 1
    // minHeight: "765px"
  },
  text: {
    fontSize: 17,
    lineHeight: "24px",
    padding: "15px",
    border: "2px solid #e5e5e5",
    margin: "15px 0",
    overFlow: "auto",
    whiteSpace: "pre-wrap",
    Width: "100%",
    borderRadius: 6,
    resize: "vertical",
    outline: "none",
    backgroundColor: "#fafafa"
  }
});

PostForm.propTypes = propTypes;

export default withStyles(styles)(PostForm);
