import { configureStore, combineReducers } from '@reduxjs/toolkit'
import monday from '../redux/slices/mondaySlice'
import tuesday from '../redux/slices/tuesdaySlice'
import wednesday from '../redux/slices/wednesdaySlice'
import thursday from '../redux/slices/thursdaySlice'
import friday from '../redux/slices/fridaySlice'
import saturday from '../redux/slices/saturdaySlice'
import sunday from '../redux/slices/sundaySlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'cart',
    storage,
}

const rootReducer = combineReducers({
    monday:monday,
    tuesday: tuesday,
    wednesday: wednesday,
    thursday: thursday,
    friday: friday,
    saturday: saturday,
    sunday: sunday,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch