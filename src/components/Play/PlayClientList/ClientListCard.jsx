import React from "react";
import injectSheet from "react-jss";

import CommonTitle from "../CommonComponents/commonTitle";
import CommonText from "../CommonComponents/commonText";

const ClientListCard = props => {
  const { client, classes } = props;
  return (
    <div className={classes.container}>
      <CommonTitle color="black">NAME: {client.username}</CommonTitle>
      <CommonText color="black" fontSize={14}>
        ID: {client.id}
      </CommonText>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    minWidth: '245px',
    margin: "10px",
    borderRadius: 8
  }
});

export default injectSheet(styles)(ClientListCard);
