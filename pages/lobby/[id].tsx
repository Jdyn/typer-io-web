import { LazyMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import Lobby from '../../components/Lobby';
import Play from '../../components/Play';
import { silentClose } from '../../services/socket';
import { AppState } from '../../store';
import { initSocket } from '../../store/game/actions';

const loadFeatures = () => import('../../util/framerfeatures').then((res) => res.default);

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const socket = useSelector((state: AppState) => state.game.socket);
  const isStarted = useSelector((state: AppState) => state.game.room.isStarted);

  useEffect(() => {
    if (!socket.connected && !socket.pending) {
      const token = localStorage.getItem('token') || '';

      let config;

      if (id) {
        config = { roomType: 'PRIVATE', roomId: id };
      } else {
        config = {
          roomType: 'CUSTOM',
          quoteDifficulty: 'random',
          maxRoomSize: 5,
          isCustomQuote: false
        };
      }

      const nickname = localStorage.getItem('nickname') || null;
      const username = nickname || localStorage.getItem('username') || nickname;

      const emoji = localStorage.getItem('emoji') || '🐌';

      const payload = {
        username,
        token,
        emoji
      };

      dispatch(initSocket(payload, config));
    }
  }, [dispatch, id, socket.connected, socket.pending]);

  useEffect(() => {
    return (): void => {
      silentClose();
    };
  }, [dispatch]);

  return isStarted ? (
    <Layout striped>
      <LazyMotion features={loadFeatures} strict>
        <Play isCustom />
      </LazyMotion>
    </Layout>
  ) : (
    <Layout
      striped
      title="Private Lobby"
      description="Multiplayer Private Lobby"
      ogTitle="You have been invited to a typing race"
    >
      <LazyMotion features={loadFeatures} strict>
        <Lobby />
      </LazyMotion>
    </Layout>
  );
};

// Doing this to convert the function to a lambda so the :id
// from the URL is available instantly on first load.
export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default LobbyContainer;
