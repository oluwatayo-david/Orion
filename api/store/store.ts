// Update the store to include the savings reducer
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { mmkvStorage } from "@/api/storage/mmkvStorage";
import { combineReducers } from "redux";
import authReducer from "@/api/features/auth/authSlice";
import notificationReducer from "@/api/features/Notification/notificationSlice";
import aiReducer from "@/api/features/ai-chat/aislice";
import savingsReducer from "@/api/features/savings/savingsSlice";

const persistConfig = {
    key: "root",
    storage: mmkvStorage,
    whitelist: ["auth", "biometric", "tag", "profile"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    ai: aiReducer,
    savings: savingsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () =>
    useDispatch<AppDispatch>();