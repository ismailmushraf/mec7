import { atom, selector } from 'recoil';
import type { Member } from '@ismailmushraf/mec7';
import { apiService } from '../../services/api';

export const userState = atom<Member | null>({
  key: 'userState',
  default: null,
});

export const authLoadingState = atom<boolean>({
  key: 'authLoadingState',
  default: true,
});

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  },
});

// Initialize auth state
export const initializeAuth = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const user = await apiService.getMe();
      return user;
    } catch (error) {
      apiService.clearToken();
      return null;
    }
  }
  return null;
};
