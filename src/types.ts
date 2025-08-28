
export interface Tarea {
  id: string
  titulo: string
  estado: EstadoTarea
  fechaCreacion: Date
}

export type EstadoTarea = 'hacer' | 'haciendo' | 'terminado'