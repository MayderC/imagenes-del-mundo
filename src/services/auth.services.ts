export const login = (email: string, token: string) => {
  return btoa(email + ":" + token);
};
