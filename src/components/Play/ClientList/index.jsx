import React from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientCard from "./ClientCard";
import Header from "../../Common/Header";

const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, classes, socket } = props;

  return (
    <div className={classes.container}>
      {socket.connected && (
        <Transition
          items={room.clients}
          keys={item => item.id}
          from={{ overflow: "hidden", width: "0px" }}
          enter={{ width: "235px" }}
          leave={{ width: "0px" }}
        >
          {client => props => (
            <ClientCard
              style={props}
              client={client}
              color={client.gamePiece.color}
            />
          )}
        </Transition>
      )}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "Flex",
    flexDirection: "row",
    gridRow: "1 / 2",
    gridColumn: "1 / 4",
    margin: "20px auto 0px auto",
    position: "relative",
    height: "100px"
  },
  wpm: {
    display: "flex",
    flexDirection: "row",
    margin: "auto 0px auto auto",
    backgroundColor: "",
    fontSize: 12,
    verticalAlign: "middle",
    color: theme.primaryWhite //"#616161"
  },
  wpmBadge: props => ({
    height: "15px",
    width: "25px",
    margin: "10px 5px 8px 5px",
    backgroundColor: props.currentClient
      ? props.currentClient.gamePiece.color
      : "transparent",
    borderRadius: 2
  })
});

export default withStyles(styles)(ClientList);
