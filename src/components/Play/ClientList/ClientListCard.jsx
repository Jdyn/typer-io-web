import React from "react";
import injectSheet from "react-jss";
import CommonTitle from "../../CommonComponents/commonTitle";

const ClientListCard = props => {
  const { client, classes } = props;

  return (
    <div className={classes.container}>
      <CommonTitle color="#525f7f" fontSize="24px" padding="15px">
        {client.username}
      </CommonTitle>
      <div className={classes.colorBadge}>
        <div className={classes.wpmNumber}>{client.gamePiece.wpm}</div>
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    minWidth: "245px",
    // margin: "10px",
    borderRadius: 8
  },
  wpmNumber: {
    display: "flex",
    flexDirection: "row",
    fontSize: "24px",
    margin: "0px 0px 0px auto"
  },
  wpmText: {
    margin: "0px 0px 0px auto",
    verticalAlign: "text-bottom"
  },
  colorBadge: {
    display: "flex",
    margin: "0 0 0 auto",
    width: "100px",
    height: "100%",
    borderRadius: "0 0 8px 0",
    backgroundColor: props => props.client.gamePiece.color
  }
});

export default injectSheet(styles)(ClientListCard);
