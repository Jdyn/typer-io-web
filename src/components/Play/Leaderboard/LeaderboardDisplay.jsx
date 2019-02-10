import React from "react";
import withStyles from "react-jss";
import Header from "../../Common/Header";

const LeaderboardDisplay = props => {
  const { classes, theme } = props;
  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        margin="0px 0px -8px 0px"
        fontSize={24}
        height="62px"
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Leaderboard
      </Header>
    </div>
  );
};

const styles = {
  container: {
      
  }
};
export default withStyles(styles, { injectTheme: true })(LeaderboardDisplay);
