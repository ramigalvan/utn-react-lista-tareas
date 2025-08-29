export type EstadoTarea = 'hacer' | 'haciendo' | 'terminado'

export interface Tarea {
  id: string
  titulo: string
  estado: EstadoTarea
  fechaCreacion: string 
}

