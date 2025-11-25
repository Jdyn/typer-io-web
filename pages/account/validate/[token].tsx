import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/Layout';
import PrivateRoute from '../../../components/Shared/PrivateRoute';
import { useValidateEmailQuery } from '../../../services/account';
import { authenticate } from '../../../store/session/actions';

const SendAccountEmailValidation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = router.query;

  const { data, isSuccess, isLoading } = useValidateEmailQuery(token as string, {
    skip: !token
  });

  useEffect(() => {
    // When email validation is successful, refresh the user data
    if (isSuccess && data?.ok) {
      dispatch(authenticate() as any);
    }
  }, [isSuccess, data?.ok, dispatch]);

  if (typeof token === 'undefined' || isLoading) {
    return (
      <Layout>
        <main
          style={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1>Email Verification</h1>
          <p>Verifying your email...</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {data?.ok ? (
          <>
            <h1>Email Verification</h1>
            <p>Thank you, your email is now verified.</p>
          </>
        ) : (
          <>
            <h1>Email Verification</h1>
            <p>Could not verify email. Please try again.</p>
          </>
        )}
      </main>
    </Layout>
  );
};

export default PrivateRoute(SendAccountEmailValidation);
