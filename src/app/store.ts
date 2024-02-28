import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import CurrentsSlice from "../features/currentsSlice.ts";

export const store = configureStore({
    reducer: {
        currents: CurrentsSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
