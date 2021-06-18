import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Form from '../../Shared/Form';
import styles from './index.module.css';
import { fetchPasswordReset, fetchPasswordUpdate } from '../../../store/session/actions';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';

const templates = {
  reset: {
    type: 'reset',
    title: 'Reset Your Password',
    description: "Enter your email address below and we'll send you a link to reset your password.",
    fields: [{ name: 'Email', key: 'email', type: 'email', placeholder: 'jane.doe@email.com' }],
    submit: 'submit'
  },
  recover: {
    type: 'recover',
    title: 'Enter new Password',
    fields: [
      { name: 'New Password', type: 'password', key: 'password' },
      { name: 'Verify New Password', type: 'password', key: 'verifyPassword' }
    ],
    submit: 'submit'
  }
};

interface Props {
  resetToken?: string;
}

const ForgotAuth = (props: Props): JSX.Element => {
  const { resetToken } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const passwordRequest = useSelector((state: AppState) => ({
    reset: state.request.FETCH_ACCOUNT_PASSWORD_RESET || {
      success: false,
      errored: false,
      error: ''
    },
    update: state.request.FETCH_ACCOUNT_PASSWORD_UPDATE || {
      success: false,
      errored: false,
      isPending: false,
      error: ''
    }
  }));

  const handleReset = (type, form): void => {
    if (form.email) {
      dispatch(fetchPasswordReset(form.email));
    }
  };

  const handleUpdate = (type, form): void => {
    if (form.password === form.verifyPassword && form.password && form.verifyPassword) {
      dispatch(fetchPasswordUpdate(form.password, resetToken));
    } else {
      setError('Passwords do not match.');
    }
  };

  return (
    <div className={styles.root}>
      {resetToken ? (
        <div className={styles.container}>
          {passwordRequest.update.success ? (
            <div className={styles.wrapper}>
              <h3>Success!</h3>
              <p>Your password has been successfully reset.</p>
              <Link href="/account/login">
                <Button>Log In</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Form
                template={templates.recover}
                isPending={passwordRequest.update.isPending}
                onSubmit={handleUpdate}
              />
              {passwordRequest.update.errored && <p>{passwordRequest.update.error}</p>}
              <p>{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          {passwordRequest.reset.success ? (
            <div>
              <h3>Check Your Email</h3>
              <p>
                If there is an account associated with the email address you provided, we will send
                you an email.
              </p>
            </div>
          ) : (
            <Form template={templates.reset} onSubmit={handleReset} />
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotAuth;