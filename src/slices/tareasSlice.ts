import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EstadoTarea, Tarea } from "../types";

interface TareasState {
    lista: Tarea[]
}

const initialState: TareasState = {
    lista: []
}


const tareasSlice = createSlice({
    name: "tareas",
    initialState,
    reducers: {
        agregarTarea: (state, action: PayloadAction<Omit<Tarea, "id" |"fechaCreacion">>) => {
            const nuevaTarea: Tarea = {
                ...action.payload,
                id: crypto.randomUUID(),
                fechaCreacion: new Date().toISOString()
            };
            state.lista.push(nuevaTarea);

        },

        eliminarTarea: (state, action: PayloadAction<string>) => {
            state.lista = state.lista.filter(t => t.id !== action.payload)
        },

        actualizarTarea: (state, action: PayloadAction<{id: string; titulo: string; estado: EstadoTarea}>) => {
            const tarea = state.lista.find(t => t.id === action.payload.id);
            if(tarea){
                tarea.titulo = action.payload.titulo;
                tarea.estado = action.payload.estado;
            }
        },

        cambiarEstadoTarea: (state, action: PayloadAction<{id: string; estado: EstadoTarea}>) => {
            const tarea = state.lista.find(t => t.id === action.payload.id);
            if(tarea){
                tarea.estado = action.payload.estado;
            }

        }
    }
});


export const {actualizarTarea, agregarTarea, cambiarEstadoTarea, eliminarTarea} = tareasSlice.actions
export default tareasSlice.reducer