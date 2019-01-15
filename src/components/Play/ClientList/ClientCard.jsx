import React from "react";
import injectSheet from "react-jss";

const ClientCard = props => {
  const { client, classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />
      <div className={classes.stat}>{client.gamePiece.accuracy}</div>
      <div className={classes.stat}>{client.gamePiece.errors}</div>
      <div className={classes.stat}>{client.gamePiece.wpm}</div>
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "min-content 6px auto",
    width: "100%",
    borderRadius: 8,
    ...props.style
  }),
  username: {
    padding: "5px 15px 0px 15px",
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    fontSize: "22px",
    fontWeight: 600
  },
  stat: {
    fontSize: "28px",
    textAlign: "center",
    verticalAlign: "middle"
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
