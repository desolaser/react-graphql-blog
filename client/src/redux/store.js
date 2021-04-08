import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'

import authReducer from './reducers/authSlice'

const persistConfig = {
  key: 'auth',
  storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer
  },
})

const persistor = persistStore(store)

export default store
export {
  persistor
}