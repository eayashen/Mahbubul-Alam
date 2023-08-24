import { createSlice } from '@reduxjs/toolkit'

export const loginData = createSlice({
  name: 'loginData',
  initialState: {
    userName: 'mahbub',
    password: 'mahbubicddrb',
  },
})

export default loginData.reducer;