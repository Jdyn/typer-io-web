import React from "react";
import withStyles from "react-jss";

const ClientCard = props => {
  const { client, classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />
      <div className={classes.errors}>{client.gamePiece.errors}</div>
      <div className={classes.accuracy}>{client.gamePiece.accuracy}</div>
      <div className={classes.wpm}>{client.gamePiece.wpm}</div>
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "min-content 2px auto",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    backgroundColor: props.color,
    ...props.style
  }),
  username: {
    padding: "5px 15px 0px 15px",
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    fontSize: "22px",
    color: theme.primaryWhite,
    fontWeight: 600
  },
  accuracy: {
    fontSize: "24px",
    textAlign: "center",
    verticalAlign: "middle",
    // color: "#81C784",
    color: theme.primaryWhite,
  },
  errors: {
    fontSize: "24px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#e57373",

  },
  wpm: {
    fontSize: "24px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#64B5F6",
  },
  divider: {
    height: "2px",
    gridColumn: "1 / 4",
    margin: "0px auto 0px auto",
    border: "none",
    flexShrink: 0,
    width: "75%",
    backgroundColor: theme.divider
  }
});

export default withStyles(styles)(ClientCard);
