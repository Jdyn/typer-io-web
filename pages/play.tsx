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

  useEffect(() => {
    if (!socket.connected) {
      const localName = localStorage.getItem('username');

      const payload = {
        username: localName,
        token: ''
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
    <Layout>
      <Play />;
    </Layout>
  );
};

export default PlayContainer;
