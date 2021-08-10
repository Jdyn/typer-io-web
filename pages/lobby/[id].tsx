import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Lobby from '../../components/Lobby';
import { initSocket, leaveRoom } from '../../store/game/actions';
import Play from '../../components/Play';
import { AppState } from '../../store';
import Layout from '../../components/Layout';

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const socket = useSelector((state: AppState) => state.game.socket);
  const isStarted = useSelector((state: AppState) => state.game.room.isStarted);
  const roomId = useSelector((state: AppState) => state.game.room.id);

  useEffect(() => {
    if (!socket.connected && !socket.pending) {
      const { id } = router.query;
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
  }, [dispatch]);

  useEffect(() => {
    return (): void => {
      dispatch(leaveRoom({ id: roomId, errored: false }));
    };
  }, [dispatch]);

  return isStarted ? (
    <Layout striped>
      <Play isCustom />
    </Layout>
  ) : (
    <Layout striped>
      <Lobby />
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
