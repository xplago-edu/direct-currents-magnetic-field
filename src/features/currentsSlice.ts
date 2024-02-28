import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../app/store.ts'
import {Current} from "../models/Current.ts";

export interface CurrentsState {
    currents: Current[];
}

const initialState: CurrentsState = {
    currents: [],
}

export const currentsSlice = createSlice({
    name: 'currents',
    initialState,
    reducers: {
        addCurrent: (
            state,
            payload: PayloadAction<Current>) => {
            state.currents.push(payload.payload);
        },
        removeCurrent: (
            state,
            payload: PayloadAction<{id: string}>) => {
            state.currents = state.currents.filter(current => current.id !== payload.payload.id);
        },
        updateCurrentByIndex: (
            state,
            payload: PayloadAction<{index: number, current: Current}>) => {
            state.currents[payload.payload.index] = payload.payload.current;
        },
    },
})

export const {
    addCurrent,
    removeCurrent,
    updateCurrentByIndex,
} = currentsSlice.actions

export const selectCurrents = (state: RootState) => state.currents.currents;

export default currentsSlice.reducer