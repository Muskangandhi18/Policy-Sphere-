import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupStart(state) {
      state.status = 'loading';
    },
    signupSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    signupFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = userSlice.actions;

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    // Simulate API call
    setTimeout(() => {
      dispatch(signupSuccess(userData));
    }, 1000);
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export default userSlice.reducer;
