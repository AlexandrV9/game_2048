import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

export type ReducersMap = {
  user: typeof userReducer
}

const createRootReducer = () =>
  combineReducers<ReducersMap>({
    user: userReducer,
  })

export const createReduxStore = () => {
  return configureStore({
    reducer: createRootReducer(),
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const reduxStore = createReduxStore()

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore
