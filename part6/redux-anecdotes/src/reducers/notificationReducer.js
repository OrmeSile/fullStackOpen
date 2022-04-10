import { createSlice } from "@reduxjs/toolkit";

const initialState = 'hello'
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
  }
})

export default notificationSlice.reducer