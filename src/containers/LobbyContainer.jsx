import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Lobby from '../components/Lobby';
import ReactGA from "react-ga";
import { initSocket, sendChatMessage, leaveRoom } from '../actions/ClientActions';
import Play from '../components/Play';

const LobbyContainer = (props) => {
  const { room, leaveRoom, socket, match, initSocket, session } = props;

  useEffect(() => {
    ReactGA.pageview("/lobby");
    if (!socket.connected) {
      const localUsername = localStorage.getItem('username');

      if (match.params.room_id) {
        initSocket(
          {
            username: localUsername || props.client.username,
            token: session.token || null
          },
          { mode: 'PRIVATE', ...props.match.params }
        );
      } else {
        initSocket(
          {
            username: localUsername || props.client.username,
            token: props.session.token || null
          },
          { mode: 'CUSTOM', ...props.match.params }
        );
      }
    }
    return () => {
      if (room.id !== null) {
        leaveRoom({ id: room.id, errored: false });
      }
    };
  }, [room.id]);

  return room.isStarting ? <Play {...props} /> : <Lobby {...props} />;
};

const mapStateToProps = (state) => ({
  client: state.client.meta,
  room: state.client.room,
  session: state.session,
  socket: state.client.socket,
  gameboard: state.client.room.gameboard
});

const mapDispatchToProps = (dispatch) => {
  return {
    initSocket: (username, params) => dispatch(initSocket(username, params)),
    leaveRoom: (payload) => leaveRoom(payload),
    sendChatMessage: (payload) => sendChatMessage(payload)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
