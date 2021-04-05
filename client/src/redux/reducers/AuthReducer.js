import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    login: (state, action) => action.payload,
    logout: () => {}
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer