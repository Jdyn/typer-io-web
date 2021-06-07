import React from 'react';
import nextCookie from 'next-cookies';
import Router from 'next/router';

const login = '/login?redirected=true';

const checkUserAuthentication = (context) => {
  const { token } = nextCookie(context);

  if (token) {
    return {
      auth: {
        token
      }
    };
  }

  return { auth: null };
};

const PrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication(context);

    if (!userAuth?.auth) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};

export default PrivateRoute;
