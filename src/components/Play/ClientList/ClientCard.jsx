import React from "react";
import withStyles from "react-jss";
import Divider from "../../Common/Divider";
import Header from "../../Common/Header";

const ClientCard = props => {
  const { client, classes, theme } = props;

  return (
    <div className={classes.container}>
      {/* <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />

      <div className={classes.title}>errors</div>
      <div className={classes.title}>accuracy</div>
      <div className={classes.title}>w/pm</div>

      <div className={classes.errors}>{client.gamePiece.errors}</div>
      <div className={classes.accuracy}>{client.gamePiece.accuracy}</div>
      <div className={classes.wpm}>{client.gamePiece.wpm}</div> */}
      <Header
        color={theme.fontColor}
        fontSize={18}
        fontWeight={400}
        padding="10px 0px 10px 0px"
        className={classes.username}
      >
        {client.username}
      </Header>
      {/* <div className={classes.band}></div> */}
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    // display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    // gridTemplateRows: "min-content 2px auto",
    borderTop: `solid 1px ${theme.divider}`,
    "&:first-child": {
      border: "none"
    },
    width: "100%",
    backgroundColor: theme.primaryWhite,
    ...props.style
  }),
  band: props => ({
    width: "10%",
    height: "100%",
    marginLeft: "100%",
    backgroundColor: props.color
  })
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
