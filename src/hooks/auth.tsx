import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import jwt from 'jsonwebtoken';

interface AuthState {
  token: string | '';
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  token: string;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await localStorage.getItem('@CadCli:token');
      console.log('useEffect', token);
      if (token) {
        setData({ token });
      }
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async () => {
    const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    console.log('token', token);

    await localStorage.setItem('@CadCli:token', token);

    setData({ token });
  }, []);

  const signOut = useCallback(async () => {
    await localStorage.removeItem('@CadCli:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
