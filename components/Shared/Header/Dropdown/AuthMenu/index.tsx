import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Form from '../../../Form';
import { Request } from '../../../../../store/request/types';
import styles from './index.module.css';
import { handleAuth } from '../../../../../store/session/actions';

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
    fields: [
      { title: 'Home', link: '/' },
      { title: 'Discuss', link: '/forum' },
      { title: 'Log In', link: '/login' },
      { title: 'Sign Up', link: '/signup' }
    ],
    submit: 'ok'
  }
};

export type Types = 'login' | 'signup' | 'profile' | 'menu' | '';

interface Props {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  type: Types;
  updateModal: (newType: Types) => void;
  sessionRequest: Request;
}

const AuthMenu = (props: Props): JSX.Element => {
  const { modalRef, updateModal, isOpen, type, sessionRequest } = props;
  const dispatch = useDispatch();

  const authenticate = (formType, form) => {
    dispatch(handleAuth(formType, form, '/'));
  };

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
                    {templates[type].fields.map((item) => (
                      <Link key={item.title} href={item.link}>
                        <li className={styles.modalListItem}>{item.title}</li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <Form
                    template={templates[type]}
                    onSubmit={(formType, form) => authenticate(formType, form)}
                    isPending={sessionRequest?.isPending}
                  />
                )}
                <div className={styles.error}>
                  {sessionRequest?.errored && (
                    <span>{sessionRequest?.error}</span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AuthMenu;
