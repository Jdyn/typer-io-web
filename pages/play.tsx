import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Play from '../components/Play';
import { initSocket, leaveRoom } from '../store/game/actions';
import { AppState } from '../store';
import Layout from '../components/Shared/Layout';

const PlayContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const RoomId = useSelector((state: AppState) => state.game.room.id);
  const socket = useSelector((state: AppState) => state.game.socket);

  useEffect(() => {
    if (!socket.connected && !socket.pending) {
      const token = localStorage.getItem('token') || '';

      const nickname = localStorage.getItem('nickname') || null;
      const username = nickname || localStorage.getItem('username') || nickname;

      const emoji = localStorage.getItem('emoji') || '🐌';

      const payload = {
        emoji,
        username,
        token
      };

      const config = { roomType: 'MULTIPLAYER' };

      dispatch(initSocket(payload, config));
    }

    return (): void => {
      if (RoomId !== null) {
        leaveRoom({ id: RoomId, errored: false });
      }
    };
  }, [dispatch, RoomId, socket.connected, socket.pending]);

  return (
    <Layout striped>
      <Play />
    </Layout>
  );
};

export default PlayContainer;
