import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const emptyState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return emptyState;
  }

  const token = window.localStorage.getItem('token');
  const userStr = window.localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);

      return {
        user,
        token,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
  }

  return emptyState;
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;