import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer from "@admin/state";
import { api as adminApi } from "@admin/state/api";
import userReducer from "@lander/redux/reducer/userReducer";

// Single Redux store for the unified app. Each section that needs Redux
// reads only the slice it cares about, so they don't step on each other.
//
//   global  \u2192 Admin (theme mode, current admin userId)
//   user    \u2192 Lander (auth: userId, role, token)
//   adminApi \u2192 Admin RTK Query endpoints
//
// Vendor uses no Redux at all.
export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminApi.middleware),
});

setupListeners(store.dispatch);
