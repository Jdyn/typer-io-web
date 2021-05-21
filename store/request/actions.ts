import { Request } from './types';

const getStatus = (isPending: boolean, error: string): string => {
  let status = 'unknown';

  if (isPending) {
    status = 'pending';
  } else if (error) {
    status = 'errored';
  } else if (!isPending && !error) {
    status = 'success';
  }

  return status;
};

export const setRequest = (
  isPending: boolean,
  requestType: string,
  error?: string
): Request => {
  const status = getStatus(isPending, error);

  return {
    type: `request/${requestType}/${status}`,
    requestType,
    isPending,
    success: !error && !isPending,
    errored: !!error,
    error: error || null
  };
};
