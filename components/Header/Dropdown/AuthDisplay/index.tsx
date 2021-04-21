import React, { useEffect, useState, useRef } from 'react';
import AuthProfile from '../AuthProfile';
import AuthMenu from '../AuthMenu';
import styles from './index.module.css';
import { Request } from '../../../../store/request/types';

interface Props {
  children?: React.ReactNode;
  session: any;
  handleAuth: (type: string, form: object) => void;
  sessionRequest: Request;
}

export type Types = 'login' | 'signup' | 'profile' | 'menu' | '';

const AuthDisplay: React.FC<Props> = (props: Props) => {
  const { session, sessionRequest } = props;

  const [type, setType] = useState<Types>('');
  const [isOpen, setOpen] = useState(false);

  const modalRef: React.RefObject<HTMLDivElement> = useRef();

  const updateModal = (newType: Types): void => {
    if (isOpen) {
      if (newType === type) {
        setOpen(false);
        setType('');
      } else {
        setType(newType);
      }
    } else {
      setOpen(true);
      setType(newType);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (modalRef.current) {
        const { target } = event;
        if (!modalRef.current.contains(target as Node)) {
          document.removeEventListener('mousedown', handleClickOutside);
          setOpen(false);
          setType('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    if (typeof window !== 'undefined') {
      if (isOpen) {
        if (window.innerWidth < 815) {
          document.body.style.position = 'fixed';
          document.body.style.width = '100vw';
          document.body.style.top = `-${window.scrollY}px`;
        }
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0', 2) * -1);
      }
    }

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, session]);

  useEffect(() => {
    if (sessionRequest?.success) {
      setOpen(false);
      setType('');
    }
  }, [sessionRequest]);

  const renderContent = (isLoggedIn: boolean | null): JSX.Element => {
    switch (isLoggedIn) {
      case true:
        return (
          <AuthProfile
            modalRef={modalRef}
            isOpen={isOpen}
            updateModal={updateModal}
            session={session}
            type={type}
          />
        );

      case false:
        return (
          <AuthMenu
            modalRef={modalRef}
            isOpen={isOpen}
            updateModal={updateModal}
            sessionRequest={sessionRequest}
            type={type}
          />
        );

      default:
        return <div className={styles.loading} />;
    }
  };

  return renderContent(session.isLoggedIn);
};

export default AuthDisplay;
