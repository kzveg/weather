import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { citysReducer } from '../redux/reducer';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


// const reducers = combineReducers({
//   citys:citysReducer
// })

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// export const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: {
    citys: citysReducer
  },
});

// export const persistor = persistStore(store)

