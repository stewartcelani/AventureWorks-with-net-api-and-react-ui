import { createContext, useContext } from 'react';
import { authContext, type AuthContext as AuthContextType } from '@/types/authContext.ts';

export const AuthContext = createContext<AuthContextType>(authContext);

export const useAuth = () => useContext(AuthContext);
