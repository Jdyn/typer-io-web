import { useDispatch, useSelector } from 'react-redux';
import { handleAuth } from '../../../store/session/actions';
import { AppState } from '../../../store';
import Form from '../../Shared/Form';

import styles from './index.module.css';

const formTemplate = {
  signup: {
    type: 'signup',
    title: 'New Account',
    fields: [
      { name: 'email', type: 'email' },
      { name: 'username', type: 'username' },
      { name: 'password', type: 'password' }
    ],
    submit: 'sign up'
  },
  login: {
    type: 'login',
    title: 'Existing Account',
    fields: [
      { name: 'username', type: 'username', placeholder: '' },
      { name: 'password', type: 'password' }
    ],
    submit: 'log in'
  }
};

interface Props {
  type: 'login' | 'signup';
}

const AuthPage = ({ type }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const sessionRequest = useSelector((state: AppState) => state.request.AUTHENTICATE);

  const onSubmit = (form: Record<string, unknown>): void => {
    dispatch(handleAuth(type, form, '/'));
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Form
          template={formTemplate[type]}
          onSubmit={(_, form): void => onSubmit(form)}
          isPending={sessionRequest?.isPending}
        />
        {sessionRequest?.errored && <div className={styles.error}>{sessionRequest.error}</div>}
      </div>
    </div>
  );
};

export default AuthPage;
