import { configureStore } from "@reduxjs/toolkit";
import tareasReducer from "../slices/tareasSlice"


export const store = configureStore({
    reducer: {
        tareas: tareasReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch