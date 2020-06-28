import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import Form from '../../Shared/Form';
import { handleAuth } from '../../../store/session/actions';
import { AppState } from '../../../store';

const templates = {
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
  login: {
    type: 'login',
    title: 'Existing Account',
    fields: [
      { name: 'username', type: 'username', placeholder: '' },
      { name: 'password', type: 'password' }
    ],
    submit: 'log in'
  }
};

interface Props {
  type: 'login' | 'signup';
}

const AccountAuth = (props: Props): JSX.Element => {
  const { type } = props;
  const dispatch = useDispatch();
  const sessionRequest = useSelector((state: AppState) => state.request.AUTHENTICATE);

  const handle = (type, form) => {
    dispatch(handleAuth(type, form, '/'));
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Form
          template={templates[type]}
          onSubmit={(formType, form): void => handle(type, form)}
          isPending={sessionRequest?.isPending}
        />
        <div className={styles.error}>{sessionRequest?.errored && sessionRequest.error}</div>
        {/* <Link href="/account/recover">
          <a className={styles.link} href="/account/recover">
            Forgot Password?
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default AccountAuth;
