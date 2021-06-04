/* eslint-disable no-shadow */
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';

import { api } from '../services/api';
import { signRequest, recoverUserInformation } from '../services/auth';

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

interface SignInData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'NextJWT@token': token } = parseCookies();

    if (token) {
      recoverUserInformation()
        .then((res) => setUser(res.user));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signRequest({
      email,
      password,
    });

    setCookie(undefined, 'NextJWT@token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard');
  }

  const memoizedValue = useMemo(() => {
    const value: AuthContextData = {
      user,
      isAuthenticated,
      signIn,
    };
    return value;
  }, [isAuthenticated, signIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
