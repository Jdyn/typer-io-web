import React from "react";
import withStyles from "react-jss";
import Divider from "../../Common/Divider";
import Header from "../../Common/Header";

const ClientCard = props => {
  const { client, classes, theme } = props;
  const { gamePiece } = client;
  return (
    <div className={classes.card}>
      <Header
        color={theme.primaryWhite}
        backgroundColor={props.color}
        border="none"
        margin="5px"
        borderRadius="8px"
        fontWeight={500}
        fontSize={20}
        padding="5px"
      >
        {client.username}
      </Header>
      {/* <div className={classes.accuracy}>{gamePiece.accuracy}</div>
      <div className={classes.errors}>{gamePiece.errors}</div>
      <div className={classes.wpm}>{gamePiece.wpm}</div> */}
    </div>
  );
};

const styles = theme => ({
  card: props => ({
    display: "grid",
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "min-content min-content min-content min-content",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    // maxWidth: "275px",
    borderTop: `solid 2px ${theme.divider}`,
    "&:first-child": {
      border: "none"
    },
    ...props.style
  }),
  accuracy: {
    backgroundColor: "green",
    color: theme.primaryWhite,
    margin: "5px",
    padding: "5px",
    gridRow: "2 / 3",
    borderRadius: 8,
    width: "60px",
    textAlign: "center",
    gridColumn: "2 / 3"
  },
  errors: {
    backgroundColor: "red",
    color: theme.primaryWhite,
    margin: "5px",
    padding: "5px",
    width: "60px",
    borderRadius: 8,
    textAlign: "center",
    gridRow: "2 / 3",
    gridColumn: "3 / 4"
  },
  wpm: {
    backgroundColor: "blue",
    color: theme.primaryWhite,
    margin: "5px",
    padding: "5px",
    width: "60px",
    textAlign: "center",
    borderRadius: 8,
    gridRow: "2 / 3",
    gridColumn: "4 / 5"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
