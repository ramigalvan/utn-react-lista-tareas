import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'
import FormTarea from './components/tarea/FormTarea';
import ListaTareas from './components/tarea/ListaTareas';
import styles from "./App.module.css"


function App() {
  const [modoEdicion, setModoEdicion] = useState<string | null>(null)
  const tareas = useSelector((state: RootState) => state.tareas.lista);
  const tareaEdicion = modoEdicion ? tareas.find(t => t.id === modoEdicion) : null;

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Tareas - Redux</h1>
        <FormTarea
          modoEdicion={modoEdicion}
          setModoEdicion={setModoEdicion}
          tareaEdicion={tareaEdicion ?? undefined}
        />
        <ListaTareas onEditar={setModoEdicion} />
      </main>
    </div>
  );
}

export default App
