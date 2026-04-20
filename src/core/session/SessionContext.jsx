import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { clearStoredSession, getRememberedUsername, getStoredSession, setRememberedUsername, setStoredSession } from './sessionStorage';
import { isSessionExpired } from './sessionTime';
import { APP_ROUTES } from '../../shared/enums/routes';
import { useHistoryNavigate } from '../../shared/hooks/useHistoryNavigate';

const SessionContext = createContext(null);

const initialState = {
  bootstrapped: false,
  token: '',
  userId: '',
  username: '',
  expiration: '',
  isAuthenticated: false,
  rememberedUsername: getRememberedUsername(),
};

const sessionReducer = (state, action) => {
  switch (action.type) {
    case 'BOOTSTRAP':
      return {
        ...state,
        bootstrapped: true,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        expiration: action.payload.expiration,
        isAuthenticated: Boolean(action.payload.token),
      };
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        expiration: action.payload.expiration,
        isAuthenticated: true,
        rememberedUsername: action.payload.rememberedUsername ?? state.rememberedUsername,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        bootstrapped: true,
        rememberedUsername: state.rememberedUsername,
      };
    case 'SET_REMEMBERED_USERNAME':
      return {
        ...state,
        rememberedUsername: action.payload,
      };
    default:
      return state;
  }
};

export const SessionProvider = ({ children }) => {
  const navigate = useHistoryNavigate();
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  useEffect(() => {
    const stored = getStoredSession();
    if (stored && !isSessionExpired(stored.expiration)) {
      dispatch({ type: 'BOOTSTRAP', payload: stored });
    } else {
      clearStoredSession();
      dispatch({ type: 'BOOTSTRAP', payload: { token: '', userId: '', username: '', expiration: '' } });
    }
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      clearStoredSession();
      dispatch({ type: 'LOGOUT' });
      navigate(APP_ROUTES.LOGIN, { replace: true });
    };

    window.addEventListener('app:session-expired', handleSessionExpired);
    return () => window.removeEventListener('app:session-expired', handleSessionExpired);
  }, [navigate]);

  useEffect(() => {
    if (state.token) {
      setStoredSession({
        token: state.token,
        userId: state.userId,
        username: state.username,
        expiration: state.expiration,
      });
    }
  }, [state.token, state.userId, state.username, state.expiration]);

  const value = useMemo(
    () => ({
      ...state,
      login: ({ token, userId, username, expiration, rememberUsername }) => {
        dispatch({
          type: 'LOGIN',
          payload: {
            token,
            userId,
            username,
            expiration,
            rememberedUsername: rememberUsername ? username : '',
          },
        });
        if (rememberUsername) setRememberedUsername(username);
        else setRememberedUsername('');
      },
      logout: () => {
        clearStoredSession();
        dispatch({ type: 'LOGOUT' });
      },
      updateRememberedUsername: (username) => {
        setRememberedUsername(username);
        dispatch({ type: 'SET_REMEMBERED_USERNAME', payload: username });
      },
    }),
    [state]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return context;
};
