import { configureStore } from '@reduxjs/toolkit'
import { userAuthapi } from './api'

export const store = () => {
  return configureStore({
    reducer: {
      [userAuthapi.reducerPath]: userAuthapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAuthapi.middleware),
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']