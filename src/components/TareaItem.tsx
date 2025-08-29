import { useDispatch } from "react-redux";
import { eliminarTarea, cambiarEstadoTarea } from "../slices/tareasSlice";
import type { Tarea, EstadoTarea } from "../types";
import type { AppDispatch } from "../store/store";

interface Props {
  tarea: Tarea;
  onEditar: (id: string) => void;
}

export default function TareaItem({ tarea, onEditar }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li >
      {tarea.titulo} -
      <select
        value={tarea.estado}
        onChange={e =>
          dispatch(cambiarEstadoTarea({ id: tarea.id, estado: e.target.value as EstadoTarea }))
        }
      >
        <option value="hacer">hacer</option>
        <option value="haciendo">haciendo</option>
        <option value="terminado">terminado</option>
      </select>
      <span>{tarea.fechaCreacion}</span>
      <div>
        <button onClick={() => onEditar(tarea.id)}>editar</button>
        <button onClick={() => dispatch(eliminarTarea(tarea.id))}>eliminar</button>
      </div>
    </li>
  );
}
