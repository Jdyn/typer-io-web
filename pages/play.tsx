import { LazyMotion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';
import Play from '../components/Play';
import { silentClose } from '../services/socket';
import { AppState } from '../store';
import { initSocket } from '../store/game/actions';

const loadFeatures = () => import('../util/framerfeatures').then((res) => res.default);

const PlayContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const socket = useSelector((state: AppState) => state.game.socket);

  useEffect(() => {
    if (!socket.connected && !socket.pending && !socket.errored) {
      const token = localStorage.getItem('token');
      let id = localStorage.getItem('id') ?? null;

      if (!id) {
        localStorage.setItem('id', nanoid(6));
        id = localStorage.getItem('id');
      }

      const nickname = localStorage.getItem('nickname') || null;
      const username = nickname || localStorage.getItem('username') || nickname;

      const emoji = localStorage.getItem('emoji') || '🐌';

      const payload = {
        emoji,
        username,
        token,
        id
      };

      const config = { roomType: 'MULTIPLAYER' };

      dispatch(initSocket(payload, config));
    }
  }, [dispatch, socket.connected, socket.errored, socket.pending]);

  useEffect(() => {
    return () => {
      silentClose();
      dispatch({ type: 'DISCONNECT_SOCKET' });
    };
  }, [dispatch]);

  return (
    <Layout
      striped
      title="Quick Play | Race against random players"
      description="Very quickly match up against other players and race to be the fastest."
    >
      <LazyMotion features={loadFeatures} strict>
        <Play />
      </LazyMotion>
    </Layout>
  );
};

export default PlayContainer;
