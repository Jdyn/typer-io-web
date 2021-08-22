import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import AuthProfile from '../AuthProfile';
import AuthMenu from '../AuthMenu';
import { ModalTypes } from '../types';
import { AppState } from '../../../../store';

const AuthDisplay = (): JSX.Element => {
  const [type, setType] = useState<ModalTypes>('');
  const [isOpen, setOpen] = useState(false);

  const session = useSelector((state: AppState) => state.session);

  const modalRef: React.RefObject<HTMLDivElement> = useRef();

  const updateModal = (newType: ModalTypes): void => {
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

  return session.isLoggedIn ? (
    <AuthProfile
      modalRef={modalRef}
      isOpen={isOpen}
      updateModal={updateModal}
      session={session}
      type={type}
    />
  ) : (
    <AuthMenu modalRef={modalRef} isOpen={isOpen} updateModal={updateModal} type={type} />
  );
};

export default AuthDisplay;
