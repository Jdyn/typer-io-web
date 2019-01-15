import React from "react";
import injectSheet from "react-jss";
import { animated } from "react-spring";
const ClientCard = props => {
  const { client, classes } = props;

  return (
    <animated.div className={classes.container}>
      <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />
    </animated.div>
  );
};

const styles = theme => ({
  container: props => ({
    // display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    // gridTemplateRows: "min-content 6px auto",
    width: "100%",
    // height: "90px",
    borderRadius: 8,
    ...props.style
  }),
  username: {
    padding: "5px 15px 0px 15px",
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    fontWeight: 600
  },
  divider: {
    height: "1px",
    gridColumn: "1 / 4",
    margin: "0px auto 5px auto",
    border: "none",
    flexShrink: 0,
    width: "75%",
    backgroundColor: theme.divider
  }
});

export default injectSheet(styles)(ClientCard);
