import React, { useState } from 'react';
import Link from 'next/link';
import Form from '../../Shared/Form';
import styles from './index.module.css';
import Button from '../../Shared/Button';
import {
  useLazyResetPasswordQuery,
  useLazySendPasswordResetEmailQuery
} from '../../../services/account';
import { ApiErrorResponse } from '../../../services/types';

const templates = {
  reset: {
    type: 'reset',
    title: 'Reset Your Password',
    description: "Enter your email address below and we'll send you a link to reset your password.",
    fields: [{ name: 'Email', key: 'email', type: 'email', placeholder: 'Email' }],
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
  const [error, setError] = useState('');

  const [sendResetEmail, { isSuccess: emailSent }] = useLazySendPasswordResetEmailQuery();
  const [
    resetPassword,
    { isFetching: resetPending, isSuccess: isReset, isError, error: passwordError }
  ] = useLazyResetPasswordQuery();

  const handleReset = (_type, form): void => {
    if (form.email) {
      sendResetEmail(form.email);
    }
  };

  const handleUpdate = (_type, form): void => {
    setError(null);

    if (form.password === form.verifyPassword && form.password && form.verifyPassword) {
      resetPassword({ password: form.password, resetToken });
    } else {
      setError('Passwords do not match.');
    }
  };

  return (
    <div className={styles.root}>
      {resetToken ? (
        <div className={styles.container}>
          {isReset ? (
            <div className={styles.wrapper}>
              <h3>Success!</h3>
              <p>Your password has been reset.</p>
              <Link href="/account/login">
                <Button padding="10px">Log In</Button>
              </Link>
            </div>
          ) : (
            <div>
              <Form template={templates.recover} isPending={resetPending} onSubmit={handleUpdate} />
              {isError && <p>{(passwordError as ApiErrorResponse)?.data?.error}</p>}
              <p>{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          {emailSent ? (
            <div>
              <h3>An Email has been sent.</h3>
              <p>
                An Email has been sent if the account exists. Please check it for further
                instructions.
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

ForgotAuth.defaultProps = {
  resetToken: null
};

export default ForgotAuth;
