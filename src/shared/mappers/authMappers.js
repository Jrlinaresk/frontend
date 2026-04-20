export const normalizeLoginResponse = (payload) => ({
  token: payload?.token || '',
  expiration: payload?.expiration || payload?.expiresAt || '',
  userId: payload?.userid || payload?.userId || '',
  username: payload?.username || payload?.userName || '',
});
