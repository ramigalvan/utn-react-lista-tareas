import { useReducer, useState, type ChangeEvent, type FormEvent } from 'react'
import type { Tarea } from './types'
import { tareasReducer } from './tareaReducer'
// import './App.css'



const TAREA_INICIAL: Omit<Tarea, 'id' | 'fechaCreacion'> = {
  titulo: '',
  estado: 'hacer'
}

function App() {
  const [tareas, dispatch] = useReducer(tareasReducer, [])

  const [tarea, setTarea] = useState(TAREA_INICIAL)
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
      dispatch({
        type: 'ACTUALIZAR_TAREA',
        payload: {
          id: modoEdicion,
          titulo: tarea.titulo.trim(),
          estado: tarea.estado
        }
      })
      setModoEdicion(null)
    } else {
      dispatch({
        type: 'AGREGAR_TAREA',
        payload: {
          titulo: tarea.titulo.trim(),
          estado: tarea.estado
        }
      })
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
      dispatch({
        type: 'ELIMINAR_TAREA',
        payload: id
      })
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
      <h1>Lista de tareas - useReducer</h1>

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
        tareas.length ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            {tareas.map((tarea) =>
              <li key={tarea.id} style={{ marginBottom: "1rem" }}>
                titulo: {tarea.titulo}, estado: {tarea.estado} - <span>{tarea.fechaCreacion.toLocaleDateString()}</span>
                <div>
                  <button onClick={() => { editarTarea(tarea.id) }}>editar</button>
                  <button onClick={() => { eliminarTarea(tarea.id) }}>eliminar</button>
                </div>
              </li>)}
          </ul>
        ) : (
          <span>No hay tareas por hacer...</span>
        )
      }
    </>
  )
}


export default App
