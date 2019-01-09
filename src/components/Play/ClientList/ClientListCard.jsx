import React from "react";
import injectSheet from "react-jss";

const ClientListCard = props => {
  const { client, classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "min-content 6px auto",
    minWidth: "245px",
    minHeight: "90px",
    borderRadius: 8
  },
  username: {
    padding: "5px 15px 0px 15px",
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    fontWeight: 600
  },
  wpmNumber: {
    fontSize: "24px",
    margin: "0px 0px 0px auto"
  },
  colorBadge: {
    width: "auto",
    height: "auto",
    margin: "5px 25px 10px 25px",
    gridColumn: "1 / 4",
    gridRow: "3 / 4",
    borderRadius: "16px",
    // boxShadow: "0px 0px 20px rgba(50,50,93,.25) inset",
    backgroundColor: props => props.client.gamePiece.color
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

export default injectSheet(styles)(ClientListCard);
