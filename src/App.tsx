import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import FormTarea from './components/FormTarea'
import ListaTareas from './components/ListaTareas'
// import './App.css'


function App() {
  const [modoEdicion, setModoEdicion] = useState<string | null>(null)
  const tareas = useSelector((state: RootState) => state.tareas.lista);

  const tareaEdicion = modoEdicion ? tareas.find(t => t.id === modoEdicion) : null;
  return (
    <>
      <h1>Lista de Tareas - Redux</h1>
      <FormTarea
        modoEdicion={modoEdicion}
        setModoEdicion={setModoEdicion}
        tareaEdicion={tareaEdicion ?? undefined}
      />

      <ListaTareas onEditar={setModoEdicion} />
    </>
  )
}

export default App
