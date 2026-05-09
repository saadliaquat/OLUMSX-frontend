// // src/redux/reducers/userReducer.js
// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     currentUser: null
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     clearUser: (state) => {
//       state.currentUser = null;
//     }
//   }
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

// src/redux/userSlice.js or wherever you manage user state
// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userData: null,
//     token: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.userData = action.payload.userData;
//       state.token = action.payload.token;
//     },
//     clearUser: (state) => {
//       state.userData = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    role: null,
    token: null,  // Assuming you also want to handle tokens here
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.userId = null;
      state.role = null;
      state.token = null;  // Clear token on user logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
