import { useMemo } from 'react';
import { useAppSelector } from 'store';

const useClient = (clients) => {
  const id = useAppSelector(({ game }) => game.meta.id);
  const currrentClient = useMemo(
    () => clients.filter((item) => item.id === id)[0] || {},
    [id, clients]
  );

  return currrentClient;
};

export default useClient;
