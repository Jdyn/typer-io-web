import { useDispatch, useSelector } from 'react-redux';
import { handleAuth } from '../../../store/session/actions';
import { AppState } from '../../../store';
import Form from '../../Shared/Form';
import styles from './index.module.css';

const { root, wrapper, error } = styles;

const formTemplates = {
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

interface IAuthPage {
  type: 'login' | 'signup';
}

const AuthPage = (props: IAuthPage): JSX.Element => {
  const { type } = props;

  const dispatch = useDispatch();

  const sessionRequest = useSelector(
    (state: AppState) => state.request.AUTHENTICATE
  );

  const onFormSubmit = (form: Record<string, unknown>): void => {
    dispatch(handleAuth(type, form, '/'));
  };

  return (
    <div className={root}>
      <div className={wrapper}>
        <Form
          template={formTemplates[type]}
          onSubmit={(_, form): void => onFormSubmit(form)}
          isPending={sessionRequest?.isPending}
        />
        <div className={error}>
          {sessionRequest?.errored && sessionRequest.error}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
