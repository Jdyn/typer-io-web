import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Banner from '../../Shared/Banner';
import Button from '../../reusable/Button';
import ProfileHeader from './ProfileHeader';
import Input from '../../reusable/Input';
import ExitButton from '../../reusable/ExitButton';
import styles from './index.module.css';
import { handleAuth } from '../../../store/session/actions';

const view = {
  USER: 'USER',
  GUEST: 'GUEST',
  SIGNUP: 'SIGN UP',
  LOGIN: 'LOG IN'
};

const templates = {
  signup: {
    type: 'SIGN UP',
    fields: [
      { type: 'email', autocomplete: 'new-email' },
      { type: 'username', autocomplete: 'new-username' },
      { type: 'password', autocomplete: 'new-password' }
    ]
  },
  login: {
    type: 'LOG IN',
    fields: [
      { type: 'username', autocomplete: 'username' },
      { type: 'password', autocomplete: 'password' }
    ]
  }
};

const DashboardProfile = (props) => {
  const { session } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState(session.isLoggedIn ? view.USER : view.GUEST);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!session.isAuthenticating) {
      setState(session.isLoggedIn ? view.USER : view.GUEST);
    }
  }, [session.isLoggedIn]);

  const submitForm = (event, type) => {
    event.preventDefault();
    if (!session.isAuthenticating) {
      dispatch(handleAuth(type, form));
    }
  };

  const changeView = (state) => {
    const { isLoggedIn } = session;
    switch (state) {
      case 'BACK':
        setForm({});
        // setErrors({});
        return setState(isLoggedIn ? view.USER : view.GUEST);
      case 'LOG_OUT':
        dispatch(handleAuth('LOG OUT', form));
        return setState(view.GUEST);
      default:
        return setState(state);
    }
  };

  const renderView = (state) => {
    const data = state === templates.login.type ? templates.login : templates.signup;
    const type = data.type === view.LOGIN ? view.LOGIN : view.SIGNUP;
    switch (state) {
      case view.USER:
        return (
          <div className={styles.wrapper}>
            <ProfileHeader />
            <Button
              secondary
              noShadow
              width="85%"
              margin="0 0 15px 0"
              onClick={() => changeView('LOG_OUT')}
            >
              log out
            </Button>
          </div>
        );
      case view.GUEST:
        return (
          <div className={styles.wrapper}>
            <ProfileHeader />
            <Button
              noShadow
              secondary
              width="85%"
              margin="10px 0 0 0"
              onClick={() => changeView(view.LOGIN)}
            >
              log in
            </Button>
            <Button
              noShadow
              width="85%"
              margin="10px 0 0 0"
              onClick={() => changeView(view.SIGNUP)}
            >
              sign up
            </Button>
          </div>
        );
      case view.SIGNUP:
      case view.LOGIN:
        return (
          <div className={styles.wrapper}>
            <ExitButton onClick={() => changeView('BACK')} />
            <form className={styles.form} onSubmit={(e) => submitForm(e, type)}>
              {data.fields.map((field) => (
                <Input
                  key={field.type}
                  type={field.type}
                  placeholder={field.type}
                  width="100%"
                  autoComplete={field.autocomplete}
                  value={form[field.type] || ''}
                  onChange={(event) => setForm({ ...form, [field.type]: event.target.value })}
                />
              ))}
              <Button margin="15px 0 0 0" width="100%">
                {data.type}
              </Button>
            </form>
          </div>
        );
      default:
        setState(view.GUEST);
        return <div />;
    }
  };

  return (
    <div className={styles.container}>
      <Banner>Profile</Banner>
      {renderView(state)}
    </div>
  );
};

export default DashboardProfile;
