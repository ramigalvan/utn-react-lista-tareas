import type { EstadoTarea, Tarea } from "./types";

export type AccionTarea =
    | {type: 'AGREGAR_TAREA'; payload: Omit<Tarea, 'id' | 'fechaCreacion'> }
    | {type: 'ACTUALIZAR_TAREA'; payload: {id: string; titulo: string; estado: EstadoTarea}}
    | {type: 'ELIMINAR_TAREA'; payload: string }
    | {type: 'INICIALIZAR_TAREAS'; payload: Tarea[] }

export function tareasReducer(state: Tarea[], action: AccionTarea): Tarea[] {
    switch(action.type){

        case 'AGREGAR_TAREA': {
            const nuevaTarea: Tarea = {
                ...action.payload,
                id: crypto.randomUUID(),
                fechaCreacion: new Date()
            }
            return [...state, nuevaTarea]
        }

        case 'ELIMINAR_TAREA': {
            return state.filter(tarea => tarea.id !== action.payload)
        }

        case 'INICIALIZAR_TAREAS': {
            return action.payload
        }

        case 'ACTUALIZAR_TAREA': {
            return state.map(tarea =>
                tarea.id === action.payload.id
                ? {...tarea, titulo: action.payload.titulo, estado: action.payload.estado}
                : tarea
            )
        }

        default: {
            return state
        }
    }
}