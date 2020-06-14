import React from 'react';
import { AuthProvider } from './auth';

// Engloba todos os providers
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
