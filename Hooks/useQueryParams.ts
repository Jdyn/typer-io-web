import { useMemo } from 'react';
import { useRouter } from 'next/router';

const useQueryParams = (): { [key: string]: string } => {
  const router = useRouter();
  const value = useMemo(() => {
    const queryParamsStr = router.asPath.split('?').slice(1).join('');
    const urlSearchParams = new URLSearchParams(queryParamsStr);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }, [router.asPath]);

  return value;
};

export default useQueryParams;
