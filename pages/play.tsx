import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cookie from 'js-cookie';
import ReactGA from 'react-ga';
import Play from '../components/Play';
import { initSocket, leaveRoom } from '../store/game/actions';
import { AppState } from '../store';
import Layout from '../components/Layout';

const PlayContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const RoomId = useSelector((state: AppState) => state.game.room.id);
  const socket = useSelector((state: AppState) => state.game.socket);
  const session = useSelector((state: AppState) => state.session);

  useEffect(() => {
    ReactGA.pageview('/play');
    if (!socket.connected) {
      const token = localStorage.getItem('token') || '';
      const nickname = localStorage.getItem('username') || null;
      const username =
        localStorage.getItem('username') || session.nickname || nickname || session.user?.username;

      const payload = {
        username,
        token
      };

      const config = { mode: 'MULTIPLAYER' };

      dispatch(initSocket(payload, config));
    }

    return (): void => {
      if (RoomId !== null) {
        leaveRoom({ id: RoomId, errored: false });
      }
    };
  }, [dispatch, RoomId, socket.connected]);

  return (
    <Layout striped>
      <Play />;
    </Layout>
  );
};

export default PlayContainer;
