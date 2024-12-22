import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import studentReducer from './studentSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    students: studentReducer,
  },
});
