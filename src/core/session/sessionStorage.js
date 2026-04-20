import { STORAGE_KEYS } from '../../shared/enums/storageKeys';

export const getRememberedUsername = () => localStorage.getItem(STORAGE_KEYS.REMEMBERED_USERNAME) || '';

export const setRememberedUsername = (username) => {
  if (username) localStorage.setItem(STORAGE_KEYS.REMEMBERED_USERNAME, username);
  else localStorage.removeItem(STORAGE_KEYS.REMEMBERED_USERNAME);
};

export const getStoredSession = () => {
  const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStoredSession = (session) => {
  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
};

export const clearStoredSession = () => {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
};
