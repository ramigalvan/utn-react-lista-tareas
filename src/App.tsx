import { useState, type ChangeEvent, type FormEvent } from 'react'
// import './App.css'

type EstadoTarea = 'hacer' | 'haciendo' | 'terminado'

interface Tarea {
  id: string
  titulo: string
  estado: EstadoTarea
  fechaCreacion: Date
}

const TAREA_INICIAL: Omit<Tarea, 'id' | 'fechaCreacion'> = {
  titulo: '',
  estado: 'hacer'
}

function App() {
  const [tarea, setTarea] = useState(TAREA_INICIAL)
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [modoEdicion, setModoEdicion] = useState<string | null>(null)

  const validarFormulario = (): boolean => {
    if (!tarea.titulo.trim()) {
      setErrorMsg('El titulo es obligatorio')
      return false
    }
    if (tarea.titulo.trim().length < 3) {
      setErrorMsg('El titulo debe tener al menos 3 caracteres')
      return false
    }
    setErrorMsg('')
    return true
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (!validarFormulario()) return

    if (modoEdicion) { //actualizar tarea existente
      setTareas(tareas.map(t =>
        t.id === modoEdicion
          ? { ...t, titulo: tarea.titulo.trim(), estado: tarea.estado }
          : t
      ))
      setModoEdicion(null)
    } else {
      const nuevaTarea: Tarea = {
        ...tarea,
        id: crypto.randomUUID(),
        titulo: tarea.titulo.trim(),
        fechaCreacion: new Date()
      }
      setTareas([...tareas, nuevaTarea])
    }
    //limpiar formulario
    setTarea(TAREA_INICIAL)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setTarea(prev => ({ ...prev, [name]: value }))

    //limpiar error cuando el usuario empiece a escribir
    if (errorMsg && name === "titulo" && value.trim()) {
      setErrorMsg('')
    }
  }

  const editarTarea = (idTarea: string): void => {
    const tareaSeleccionada = tareas.find(t => t.id === idTarea)
    if (tareaSeleccionada) {
      setTarea({
        titulo: tareaSeleccionada.titulo,
        estado: tareaSeleccionada.estado,
      })
      setModoEdicion(idTarea)
    }
  }

  const eliminarTarea = (id: string): void => {
    if (window.confirm('¿estas seguro de que quieres eliminar esta tarea?')) {
      const tareasActualizada: Tarea[] = tareas.filter(t => t.id != id)
      setTareas(tareasActualizada)
      if (modoEdicion === id) {
        cancelarEdicion()
      }
    }
  }

  const cancelarEdicion = (): void => {
    setTarea(TAREA_INICIAL)
    setModoEdicion(null)
    setErrorMsg('')
  }
  
  return (
    <>
      <h1>lista de tareas</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <span >{errorMsg}</span>}
        <div >
          <input type="text"
            name="titulo"
            value={tarea.titulo}
            onChange={handleChange}
            placeholder="titulo de tarea..."
          />
          <select name="estado" value={tarea.estado} onChange={handleChange}>
            <option value="hacer">hacer</option>
            <option value="haciendo" >haciendo</option>
            <option value="terminado" >terminado</option>
          </select>
        </div>
        <button type="submit">{modoEdicion ? "Actualizar" : "Agregar tarea"}</button>
        {
          modoEdicion && (
            <button onClick={cancelarEdicion}>Cancelar</button>
          )
        }
      </form>

      {
        tareas.length ?  (
          <ul>
            {tareas.map((tarea) =>
              <li key={tarea.id} style={{ marginBottom: "1rem" }}>
                titulo: {tarea.titulo}, estado: {tarea.estado}
                <div>
                  <button onClick={() => { editarTarea(tarea.id) }}>editar</button>
                  <button onClick={() => { eliminarTarea(tarea.id) }}>eliminar</button>
                </div>
              </li>)}
          </ul>
        ): (
          <span>No hay tareas por hacer...</span>
        ) 
      }
    </>
  )
}


export default App
