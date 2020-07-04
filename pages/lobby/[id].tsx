import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Lobby from '../../components/Play/Lobby';
import { initSocket, leaveRoom } from '../../store/game/actions';
import Play from '../../components/Play';
import { AppState } from '../../store';
import Layout from '../../components/Layout';

const JoinLobby = (props) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const socket = useSelector((state: AppState) => state.game.socket);
  const isStarting = useSelector((state: AppState) => state.game.room.isStarting);
  const roomId = useSelector((state: AppState) => state.game.room.id);

  useEffect(() => {
    ReactGA.pageview('/lobby');
    if (!socket.isConected) {
      const localUsername = localStorage.getItem('username');
      const token = localStorage.getItem('token') || '';
      if (id) {
        dispatch(
          initSocket(
            {
              username: localUsername,
              token: token || null
            },
            { mode: 'PRIVATE', roomId: id }
          )
        );
      }
    }
  }, [dispatch, id, socket.isConected]);

  useEffect(() => {
    return (): void => {
      if (roomId !== null) {
        leaveRoom({ id: roomId, errored: false });
      }
    };
  }, [roomId]);

  return isStarting ? (
    <Layout striped>{/* <Play /> */}</Layout>
  ) : (
    <Layout striped>
      <Lobby />
    </Layout>
  );
};

export default JoinLobby;
