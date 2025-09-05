import { configureStore } from '@reduxjs/toolkit'
import dinemateReducer from '../features/dinemateSlice'

export const store = configureStore({
    reducer: {
        dinemate: dinemateReducer
    }
});