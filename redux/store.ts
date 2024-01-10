import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './reducers/Auth';
import PostsReducer from './reducers/Posts'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const reducers = combineReducers({
  user: AuthReducer,
  posts: PostsReducer
});

const store = configureStore({
  reducer: reducers
});

export default store;
