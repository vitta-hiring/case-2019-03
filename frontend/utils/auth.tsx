import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token, ...userInfo }) => {
  cookie.set('token', token, { expires: 1 });
  cookie.set('userInfo', userInfo, { expires: 1 });
  // window.localStorage.setItem('token', token);
  // window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  Router.push('/notes');
};

export const auth = ctx => {
  const { token } = nextCookie(ctx)
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/signin' });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/signin');
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  cookie.remove('userInfo')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/signin');
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        Router.push('/signin');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
