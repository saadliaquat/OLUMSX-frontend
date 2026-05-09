// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './reducer/userReducer';

// export const store = configureStore({
//   reducer: {
//     user: userReducer
//   }
// });

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
