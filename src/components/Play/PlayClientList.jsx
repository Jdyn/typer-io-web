import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import CommonPaper from "../CommonComponents/CommonPaper";
import CommonTitle from "../CommonComponents/commonTitle";
import CommonText from "../CommonComponents/commonText";

const PlayClientList = props => {
  const { client, classes } = props;
  return (
    <div className={classes.container}>
      <h2 className={classes.listHeaderTitle}> Current Players: </h2>
      {client.room ? (
        client.room.clients.map(client => (
          <CommonPaper padding="25px" key={client.id}>
            <CommonTitle color="black">NAME: {client.username}</CommonTitle>
            <CommonText color="black" fontSize={14}>
              ID: {client.id}
            </CommonText>
          </CommonPaper>
        ))
      ) : (
        <div>rip</div>
      )}
    </div>
  );
};

PlayClientList.propTypes = {};

const styles = {
  container: {
    display: "flex",
    width: "350px",
    flexDirection: "column",
    position: "relative",
    margin: "0px auto 0px 0px"
  },
  listHeaderTitle: {
    margin: "25px 0px 25px 15px"
  }
};

export default injectSheet(styles)(PlayClientList);
