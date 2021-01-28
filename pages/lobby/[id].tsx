import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Lobby from '../../components/Play/Lobby';
import { initSocket, leaveRoom } from '../../store/game/actions';
import Play from '../../components/Play';
import { AppState } from '../../store';
import Layout from '../../components/Shared/Layout';

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

  // useEffect(() => {
  //   if (roomId !== router.query.id && socket.connected && roomId) {
  //     router.replace(`/lobby/${roomId}`);
  //   }
  // }, [roomId, router, socket.connected]);

  useEffect(() => {
    return (): void => {
      if (roomId !== null) {
        leaveRoom({ id: roomId, errored: false });
      }
    };
  }, [roomId]);

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

export async function getServerSideProps(_context) {
  return {
    props: {} // will be passed to the page component as props
  };
}
export default LobbyContainer;
