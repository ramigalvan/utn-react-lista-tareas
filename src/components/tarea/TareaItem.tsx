import { useDispatch } from "react-redux";
import { eliminarTarea } from "../../slices/tareasSlice";
import type { Tarea  } from "../../types";
import type { AppDispatch } from "../../store/store";
import styles from "./TareaItem.module.css"

interface Props {
  tarea: Tarea;
  onEditar: (id: string) => void;
}

export default function TareaItem({ tarea, onEditar }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className={`${styles.item} ${styles[tarea.estado]}`}>
      <div className={styles.contenido}>
        <span>{tarea.titulo}</span>
        <span>estado: {tarea.estado}</span>
      </div>
      <div className={styles.botones}>
        <button onClick={() => onEditar(tarea.id)} className={`${styles.boton} ${styles.editar}`}>
          Editar
        </button>
        <button onClick={() => dispatch(eliminarTarea(tarea.id))} className={`${styles.boton} ${styles.eliminar}`}>
          Eliminar
        </button>
      </div>
    </li>
    // </li>
  );
}
