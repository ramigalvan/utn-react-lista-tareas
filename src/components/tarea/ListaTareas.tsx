import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import TareaItem from "./TareaItem";
import styles from "./ListaTarea.module.css"

interface Props {
  onEditar: (id: string) => void;
}

export default function ListaTareas({ onEditar }: Props) {
  const tareas = useSelector((state: RootState) => state.tareas.lista);

if (!tareas.length) return <span className={styles.listaEmpty}>No hay tareas...</span>;

  return (
    <ul className={styles.lista}>
      {tareas.map(t => (
        <TareaItem key={t.id} tarea={t} onEditar={onEditar} />
      ))}
    </ul>
  );
}
