import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthenticateMutation } from '../../../services/account';
import { ApiErrorResponse } from '../../../services/types';
import Form from '../../Shared/Form';

import styles from './index.module.css';

const formTemplate = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: [
      { name: 'email', type: 'email' },
      { name: 'username', type: 'username' },
      { name: 'password', type: 'password' }
    ],
    submit: 'sign up'
  },
  signin: {
    type: 'signin',
    title: 'Existing Account',
    fields: [
      { name: 'username', type: 'username', placeholder: '' },
      { name: 'password', type: 'password' }
    ],
    submit: 'log in'
  }
};

interface Props {
  type: 'signin' | 'signup';
}

const AuthPage = ({ type }: Props): JSX.Element => {
  const [authenticate, { data, isSuccess, isLoading, isError, error }] = useAuthenticateMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data?.ok) {
      router.push('/');
    }
  }, [data, isSuccess, router]);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Form
          template={formTemplate[type]}
          onSubmit={(_, form) => authenticate({ type, form })}
          isPending={isLoading}
        />
        {isError && <div className={styles.error}>{(error as ApiErrorResponse).data.error}</div>}
      </div>
    </div>
  );
};

export default AuthPage;
