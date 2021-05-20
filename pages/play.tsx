import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Play from '../components/Play';
import { initSocket, leaveRoom } from '../store/game/actions';
import { AppState } from '../store';
import Layout from '../components/Layout';

const PlayContainer = (): JSX.Element => {
  const dispatch = useDispatch();
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
  }, []);

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  });

  return (
    <Layout
      striped
      title="Quick Play | Race against random players"
      description="Very quickly match up against other players and race to be the fastest."
    >
      <Play />
    </Layout>
  );
};

export default PlayContainer;
