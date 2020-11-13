import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    if (!socket.connected) {
      const username =
        localStorage.getItem('username') ||
        session.nickname ||
        session.user?.username;
      const emoji = localStorage.getItem('emoji') || '🐌';
      const token = localStorage.getItem('token') || '';
      const payload = {
        emoji,
        username,
        token
      };

      const config = { mode: 'SOLO' };

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
      <Play isSolo />;
    </Layout>
  );
};

export default PlayContainer;
