import React from 'react';
import Link from 'next/link';
import Form from '../../../Shared/Form';
import styles from './index.module.css';
import { ThemeContext } from '../../../../util/getInitialColorMode';
import { AuthTypes, useAuthenticateMutation } from '../../../../services/account';
import { ModalTypes } from '../types';
import { ApiErrorResponse } from '../../../../services/types';

const templates = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: [
      { name: 'Email', key: 'email' },
      { name: 'Username', key: 'username' },
      { name: 'Password', key: 'password' }
    ],
    submit: 'sign up'
  },
  signin: {
    type: 'signin',
    title: 'Existing Account',
    fields: [
      { name: 'Username', key: 'username' },
      { name: 'Password', key: 'password' }
    ],
    submit: 'log in'
  },
  menu: {
    type: 'menu',
    title: 'Menu',
    fields: [
      { title: 'Home', link: '/' },
      { title: 'Discuss', link: '/forum' },
      { title: 'Hiscores', link: '/hiscores?query=top_speed&page=1&type=all' },
      { title: 'Log In', link: '/login' },
      { title: 'Sign Up', link: '/signup' }
    ],
    submit: 'ok'
  }
};

interface Props {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  type: ModalTypes;
  updateModal: (newType: ModalTypes) => void;
}

const AuthMenu = (props: Props): JSX.Element => {
  const { modalRef, updateModal, isOpen, type } = props;
  const [authenticate, { isLoading, isError, error }] = useAuthenticateMutation();

  const parseErrors = () => {
    const { errors } = (error as ApiErrorResponse).data;
    return (
      <>
        {Object.keys(errors).map((key) => (
          <div key={key}>{`${key} ${errors[key][0]}`}</div>
        ))}
      </>
    );
  };

  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <div className={styles.container} ref={modalRef}>
          <button
            type="button"
            className={styles.menuWrapper}
            onClick={(): void => updateModal('menu')}
          >
            <div className={styles.menu} />
          </button>
          <button
            type="button"
            className={styles.button}
            style={{ gridArea: 'signup' }}
            onClick={(): void => updateModal('signup')}
          >
            sign up
          </button>
          <button
            type="button"
            className={styles.button}
            style={{ gridArea: 'login' }}
            onClick={(): void => updateModal('signin')}
          >
            log in
          </button>
          {isOpen ? (
            <>
              <div className={styles.modal}>
                <div className={styles.form}>
                  {type === 'menu' ? (
                    <ul className={styles.modalList}>
                      {templates[type].fields.map((item) => (
                        <Link key={item.title} href={item.link}>
                          <li className={styles.modalListItem}>{item.title}</li>
                        </Link>
                      ))}
                      <li className={styles.modalListItem}>
                        <button
                          type="button"
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                          Change Theme
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <Form
                      template={templates[type]}
                      onSubmit={(formType: AuthTypes, form) =>
                        authenticate({ type: formType, form })
                      }
                      isPending={isLoading}
                    />
                  )}
                  <div className={styles.error}>
                    {isError && (
                      <>
                        {(error as ApiErrorResponse).data.error}
                        {(error as ApiErrorResponse).data.errors && parseErrors()}
                      </>
                    )}
                  </div>
                </div>
                <Link className={styles.link} href="u/reset">
                  Forgot Password
                </Link>
              </div>
            </>
          ) : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default AuthMenu;
