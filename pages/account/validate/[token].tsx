import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import PrivateRoute from '../../../components/Shared/PrivateRoute';
import { useValidateEmailQuery } from '../../../services/account';

const SendAccountEmailValidation = () => {
  const router = useRouter();
  const { token } = router.query;

  const { data } = useValidateEmailQuery(token as string);

  if (typeof token === 'undefined') return null;

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
