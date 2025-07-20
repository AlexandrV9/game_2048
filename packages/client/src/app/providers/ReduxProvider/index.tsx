import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export type ReduxProviderProps = {
  children: ReactNode
  store: ReturnType<typeof configureStore>
}

export const ReduxProvider = ({ children, store }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}
