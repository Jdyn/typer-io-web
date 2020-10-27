import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Lobby from '../../components/Play/Lobby';
import { initSocket, leaveRoom } from '../../store/game/actions';
import Play from '../../components/Play';
import { AppState } from '../../store';
import Layout from '../../components/Layout';

const LobbyContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const socket = useSelector((state: AppState) => state.game.socket);
  const isStarting = useSelector(
    (state: AppState) => state.game.room.isStarting
  );
  const roomId = useSelector((state: AppState) => state.game.room.id);
  const session = useSelector((state: AppState) => state.session);

  useEffect(() => {
    if (!socket.isConected) {
      const token = localStorage.getItem('token') || '';
      const nickname = localStorage.getItem('username') || null;
      const username =
        localStorage.getItem('username') ||
        session.nickname ||
        nickname ||
        session.user?.username;

      const config = { mode: 'CUSTOM' };
      const payload = {
        username,
        token
      };

      dispatch(initSocket(payload, config));
    }
  }, [dispatch, socket.isConected]);

  useEffect(() => {
    return (): void => {
      if (roomId !== null) {
        leaveRoom({ id: roomId, errored: false });
      }
    };
  }, [roomId]);

  return isStarting ? (
    <Layout striped>
      <Play />
    </Layout>
  ) : (
    <Layout striped>
      <Lobby />
    </Layout>
  );
};

export default LobbyContainer;
