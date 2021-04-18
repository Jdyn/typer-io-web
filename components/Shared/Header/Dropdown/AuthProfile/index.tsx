import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Button from '../../../Button';
import styles from './index.module.css';
import { handleAuth } from '../../../../../store/session/actions';

interface Props {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  updateModal: (type: string) => void;
  session: any;
  type: string;
}

const menu = {
  type: 'menu',
  title: 'Menu',
  items: [
    { title: 'Home', link: '/' },
    { title: 'Discuss', link: '/forum' }
  ],
  submit: 'ok'
};

const AuthProfile = (props: Props): JSX.Element => {
  const { modalRef, updateModal, session, isOpen, type } = props;

  const dispatch = useDispatch();
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
    dispatch(handleAuth('logout', {}));
  };

  return (
    <div className={styles.root} ref={modalRef}>
      <button
        className={styles.container}
        type="button"
        onClick={(): void => updateModal('profile')}
      >
        <div className={styles.wrapper}>{session.user.username}</div>
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
              </ul>
              <ul className={styles.modalList}>
                {templates[type].items.map((item) => (
                  <Link key={item.title} href={item.link}>
                    <li className={styles.modalListItem}>{item.title}</li>
                  </Link>
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
  );
};

export default AuthProfile;
