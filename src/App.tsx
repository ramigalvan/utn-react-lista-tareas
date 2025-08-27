import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'
//version 1 con useState
//version 2 con useReducer
//version 3 con redux
//final darle css

interface Tarea {
  id: string
  titulo: string
  estado: string  //usar union types, o string literals?
}
// interface EstadoTarea {
//   estado: "hacer" | "haciendo" | "terminado"
// }

function App() {

  const [tarea, setTarea] = useState<Tarea>({ titulo: "", estado: "", id: "" })
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [errorMsg, setErrorMsg] = useState<string>("")

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (tarea.titulo.trim() && tarea.estado.trim()) {
      setErrorMsg("")
      if (tarea.id) {
        setTareas(tareas.map(t => t.id === tarea.id ? tarea : t))
      } else {
        const nuevaTarea: Tarea = {
          ...tarea,
          id: crypto.randomUUID()
        }
        setTareas([...tareas, nuevaTarea])
      }
      setTarea({ estado: "", titulo: "", id: "" })
    } else {
      setErrorMsg("Complete los campos del formulario")
    }

  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = event.target;
    setTarea({ ...tarea, [name]: value })

  }

  function editarTarea(idTarea: string): void {
    const tareaSeleccionada = tareas.find(t => t.id === idTarea)
    if (tareaSeleccionada) {
      setTarea(tareaSeleccionada)
    }
    console.log("el id: " + idTarea);
  }
  //dar una posibildiad de que el usuario verifque la decision
  //mostrar modal  --> para que confirme el usuario ---> 
  function eliminarTarea(id: string) {
    const tareaEliminada: Tarea[] = tareas.filter(t => t.id != id)
    setTareas(tareaEliminada)
  }


  return (
    <>
      <h1>lista de tareas</h1>

      <form onSubmit={handleSubmit}>
        {errorMsg && <span style={{ color: "crimson" }}>{errorMsg}</span>}
        <div style={{display: "flex"}}>
          <input type="text"
            name="titulo"
            value={tarea.titulo}
            onChange={handleChange}
            placeholder="titulo de tarea..."
          />
          <select name="estado" value={tarea.estado} onChange={handleChange}>
            <option value="">selecciona un estado</option>
            <option value="hacer">hacer</option>
            <option value="haciendo" >haciendo</option>
            <option value="terminado" >terminado</option>
          </select>
        </div>
        <button type="submit">{tarea.id ? "Guardar" : "Registrar"}</button>
      </form>

      {
        tareas && (
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
        )
      }
    </>
  )
}

export default App
