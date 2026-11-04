import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import { uiSlice } from "@/store/slices/uiSlice";
export const rootReducer = combineSlices(baseApi, uiSlice);
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
