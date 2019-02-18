import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Header from "../../Common/Header";
import ContextDisplay from "./ContentDisplay";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Context = props => {
  const { classes, theme, snippet } = props;

  const difficultyColor = difficulty => {
    switch (difficulty) {
      case "easy":
        return "#81C784";
      case "medium":
        return "#e5a03e";
      case "hard":
        return "#e57373";
    }
  };

  return (
    <div className={classes.container}>
      {/* <Header
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        boxShadow="0 1px 40px rgba(50,50,93,.25)"
        fontSize={24}
        height="60px"
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Content
      </Header> */}
      <ContextDisplay
        snippet={snippet}
        difficultyColor={difficultyColor(snippet.difficulty)}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    margin: "0px 10px 10px 10px",
    height: "115px",
  }
};

Context.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Context);
