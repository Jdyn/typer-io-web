import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Lobby from '../../components/Play/Lobby';
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
  const session = useSelector((state: AppState) => state.session);

  useEffect(() => {
    if (!socket.connected && !socket.pending) {
      const { id } = router.query;
      const token = localStorage.getItem('token') || '';

      let config;

      if (id) {
        config = { mode: 'PRIVATE', roomId: id };
      } else {
        config = { mode: 'CUSTOM' };
      }

      const username =
        localStorage.getItem('username') ||
        session.nickname ||
        session.user?.username;

      const payload = {
        username,
        token
      };

      dispatch(initSocket(payload, config));
    }
  }, [dispatch, router.query, session, socket]);

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
