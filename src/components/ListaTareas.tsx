import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import TareaItem from "./TareaItem";

interface Props {
  onEditar: (id: string) => void;
}

export default function ListaTareas({ onEditar }: Props) {
  const tareas = useSelector((state: RootState) => state.tareas.lista);

  if (!tareas.length) return <span>No hay tareas...</span>;

  return (
    <ul >
      {tareas.map(t => (
        <TareaItem key={t.id} tarea={t} onEditar={onEditar} />
      ))}
    </ul>
  );
}
