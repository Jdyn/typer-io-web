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
                          <li className={styles.modalListItem}>
                            <a href={item.link}>{item.title}</a>
                          </li>
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
                      <span>
                        {(error as ApiErrorResponse).data.error || 'Failed to connect to server.'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default AuthMenu;
