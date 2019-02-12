import React from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientCard from "./ClientCard";

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
        <div className={classes.inner}>
          <Transition
            items={room.clients}
            keys={item => item.id}
            from={{
              opacity: 0,
              overflow: "hidden",
              transform: "translate3d(0,-100%,0)",
              width: "0px"
            }}
            enter={{
              opacity: 1,
              transform: "translate3d(0,0%,0)",
              width: "230px"
            }}
            leave={{ transform: "translate3d(100%,0,0)", width: "0px" }}
          >
            {client => props => (
              <ClientCard
                style={props}
                client={client}
                color={client.gamePiece.color}
              />
            )}
          </Transition>
        </div>
      )}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    gridRow: "1 / 2",
    gridColumn: "1 / 4",
    margin: "15px 1% 15px 1%",
    position: "relative",
    height: "105px",
    padding: "5px 5px 5px 5px",
    backgroundClip: "padding-box",
    border: "1px solid rgba(0,0,0,.05)",
    boxShadow: "0px 0px 15px 0px rgba(50,50,93,.25) inset",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    margin: "0 auto"
  }
});

export default withStyles(styles)(ClientList);
