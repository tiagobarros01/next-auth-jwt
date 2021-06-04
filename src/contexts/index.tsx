import React from 'react';

import { AuthContextProvider } from './AuthContext';

interface Props {
  children: React.ReactNode;
}

export function ContextProvider({ children }: Props) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
