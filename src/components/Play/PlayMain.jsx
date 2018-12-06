import React from "react";
import PropTypes from "prop-types";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";

const PlayMain = props => {
  const { classes } = props;

  const snippet = (
    <div>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum."
    </div>
  );

  return (
    <div className={classes.container}>
      <CommonPaper>
        <PlayMainSnippet snippet={snippet} />
      </CommonPaper>
    </div>
  );
};

PlayMain.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    backgroundColor: theme.primaryWhite,
    margin: "25px 15px 0px auto"
  }
});

export default injectSheet(styles)(PlayMain);
