import { createSlice } from '@reduxjs/toolkit'

export const credentialsSlice = createSlice({
  name: 'credentials',
  initialState: {
    values: {
      idToken: '',
      email: '',
      refreshToken: '',
      localId: '',
      expiresIn: '',
      registered: false
    }
  },
  reducers: {
    setCredentials: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    }
  }
})

export const { setCredentials } = credentialsSlice.actions

export const selectCredentials = (state) => state.values;
export const selectIdToken = (state) => state.values?.idToken;

export default credentialsSlice.reducer;