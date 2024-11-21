// store/reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
  likedPosts: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('likedPosts')) || [] : [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, displayName, email, accessToken } = action.payload.user; // Extract serializable fields
      state.user = { uid, displayName, email, accessToken }; // Store only serializable data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify({ uid, displayName, email, accessToken })); // Store only serializable data in localStorage
      }
    },
    logOut: (state) => {
      state.user = null;
      state.likedPosts = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('likedPosts');
      }
    },
    likePost: (state, action) => {
      state.likedPosts.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('likedPosts', JSON.stringify(state.likedPosts)); // Store liked posts in localStorage
      }
    },
    unlikePost: (state, action) => {
      state.likedPosts = state.likedPosts.filter((id) => id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('likedPosts', JSON.stringify(state.likedPosts)); // Update liked posts in localStorage
      }
    },
  },
});

export const { setUser, logOut, likePost, unlikePost } = userSlice.actions;
export default userSlice.reducer;
