import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idToken: '',
  role: '',
  isAnonymous: true
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action) => action.payload
  }
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
