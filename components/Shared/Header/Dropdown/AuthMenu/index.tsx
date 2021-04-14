import React from 'react';
import Link from 'next/link';
import Form from '../../../Form';
import { Request } from '../../../../../store/request/types';
import styles from './index.module.css';

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
  login: {
    type: 'login',
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
    fields: [],
    items: [
      { title: 'Home', link: '/' },
      { title: 'Order', link: '/boost' },
      { title: 'Demo', link: '/demo' },
      { title: 'Log In', link: '/account/login' },
      { title: 'Sign Up', link: '/account/signup' }
    ],
    submit: 'ok'
  }
};

export type Types = 'login' | 'signup' | 'profile' | 'menu' | '';

interface Props {
  handleAuth: (type: string, form: object, redirect?: string) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  type: Types;
  updateModal: (newType: Types) => void;
  sessionRequest: Request;
}

const AuthMenu = (props: Props): JSX.Element => {
  const {
    modalRef,
    updateModal,
    isOpen,
    type,
    handleAuth,
    sessionRequest
  } = props;

  return (
    <>
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
          onClick={(): void => updateModal('login')}
        >
          log in
        </button>
        {isOpen ? (
          <>
            <div className={styles.modal}>
              <div className={styles.form}>
                {type === 'menu' ? (
                  <ul className={styles.modalList}>
                    {templates[type].items.map((item) => (
                      <Link key={item.title} href={item.link}>
                        <li className={styles.modalListItem}>{item.title}</li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <Form
                    template={templates[type]}
                    onSubmit={(formType, form): void =>
                      handleAuth(formType, form, '/account/dashboard')
                    }
                    isPending={sessionRequest?.isPending}
                  />
                )}
                <div className={styles.error}>
                  {sessionRequest?.errored && (
                    <span>{sessionRequest?.error}</span>
                  )}
                </div>
                <Link href="/account/recover">
                  <span>Forgot Password?</span>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AuthMenu;
