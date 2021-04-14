import React from 'react';
import Link from 'next/link';
import Button from '../../../Button';
import styles from './index.module.css';

const templates = {
  profile: {
    type: 'profile',
    title: 'Profile',
    fields: {},
    items: [
      { title: 'Home', link: '/' },
      { title: 'Discuss', link: '/forum' }
    ],
    logout: 'log out'
  }
};

interface Props {
  handleAuth: (type: string, form: object) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  updateModal: (type: string) => void;
  session: any;
  type: string;
}

const AuthProfile = (props: Props): JSX.Element => {
  const { modalRef, updateModal, session, isOpen, type, handleAuth } = props;

  const logout = (): void => {
    handleAuth('logout', {});
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
            <ul className={styles.modalList}>
              {templates[type].items.map((item) => (
                <Link key={item.title} href={item.link}>
                  <li className={styles.modalListItem}>{item.title}</li>
                </Link>
              ))}
              <Button onClick={(): void => logout()}>
                {templates[type].logout}
              </Button>
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AuthProfile;
