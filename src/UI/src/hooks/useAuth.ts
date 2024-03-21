import { createContext, useContext } from 'react';
import { type AuthContext as AuthContextType, authContext } from '@/types/authContext.ts';

export const AuthContext = createContext<AuthContextType>(authContext);

export const useAuth = () => useContext(AuthContext);
