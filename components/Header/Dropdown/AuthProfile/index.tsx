import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../../Shared/Button';
import styles from './index.module.css';
import { ThemeContext } from '../../../../util/getInitialColorMode';
import { useAuthenticateMutation, useGetUserGoalQuery } from '../../../../services/account';
import { ModalTypes } from '../types';
import { SessionState } from '../../../../store/session/types';

interface Props {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  updateModal(type: ModalTypes): void;
  session: SessionState;
  type: ModalTypes;
}

const menu = {
  type: 'menu',
  title: 'Menu',
  items: [
    { title: 'Home', link: '/' },
    { title: 'Hiscores', link: '/hiscores?query=top_speed&page=1&type=all' },
    { title: 'Discuss', link: '/forum' }
  ],
  submit: 'ok'
};

const AuthProfile = (props: Props): JSX.Element => {
  const { modalRef, updateModal, session, isOpen, type } = props;
  const [authenticate] = useAuthenticateMutation();
  const { data: progress } = useGetUserGoalQuery(null);

  const [templates, setTemplates] = useState({
    profile: {
      type: 'profile',
      title: 'Profile',
      fields: {},
      items: [
        { title: 'Profile', link: `/u/${session.user.username}` },
        { title: 'Settings', link: `/u/settings` }
      ],
      logout: 'log out'
    },
    menu
  });

  useEffect(() => {
    if (session?.user?.username) {
      setTemplates({
        profile: {
          type: 'profile',
          title: 'Profile',
          fields: {},
          items: [
            { title: 'Profile', link: `/u/${session.user.username}` },
            { title: 'Settings', link: `/u/settings` }
          ],
          logout: 'log out'
        },
        menu
      });
    }
  }, [session.user.username]);

  const logout = (): void => {
    authenticate({ type: 'signout', form: {} });
    updateModal('profile');
  };

  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <div className={styles.root} ref={modalRef}>
          <button
            className={styles.container}
            type="button"
            onClick={(): void => updateModal('profile')}
          >
            <div className={styles.wrapper}>
              {session.user.username}
              {progress !== undefined && (
                <span>{`Daily Goal: ${progress} / ${session.user.goal}`}</span>
              )}
            </div>
            <div className={styles.portrait} />
          </button>
          {isOpen ? (
            <div className={styles.modal}>
              {type === 'profile' && (
                <>
                  <ul className={styles.menuList}>
                    {templates.menu.items.map((item) => (
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
                  <ul className={styles.modalList}>
                    {templates[type].items.map((item) => (
                      <li className={styles.modalListItem}>
                        <Link key={item.title} href={item.link}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                    <Button padding="5px" onClick={(): void => logout()}>
                      {templates[type].logout}
                    </Button>
                  </ul>
                </>
              )}
            </div>
          ) : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default AuthProfile;
