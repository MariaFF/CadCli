import React from 'react';

import { ToastProvider } from './ToastContext';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
