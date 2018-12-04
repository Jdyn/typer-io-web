import React from "react";
import PropTypes from "prop-types";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";

import CommonTitle from "../CommonComponents/commonTitle";
import CommonText from "../CommonComponents/commonText";

const propTypes = {
  socket: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  connectSocket: PropTypes.func.isRequired,
  disconnectSocket: PropTypes.func.isRequired
};

class Play extends React.Component {
  render() {
    const { classes, client } = this.props;
    return (
      <div className={classes.root}>
        <h2> Current Players: </h2>
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
  }
}

const styles = {
  root: {
    display: "flex",
    width: "350px",
    flexDirection: "column",
    position: "relative",
    margin: "0px 40px 0px auto"
  }
};

Play.propTypes = propTypes;

export default injectSheet(styles)(Play);
