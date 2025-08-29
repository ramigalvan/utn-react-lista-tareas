import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { agregarTarea, actualizarTarea } from "../../slices/tareasSlice";
import type { EstadoTarea } from "../../types";
import type { AppDispatch } from "../../store/store";
import styles from "./FormTarea.module.css";

const TAREA_INICIAL = { titulo: "", estado: "hacer" as EstadoTarea };

interface Props {
  modoEdicion: string | null;
  setModoEdicion: (id: string | null) => void;
  tareaEdicion?: { titulo: string; estado: EstadoTarea } | null;
}

export default function FormTarea({ modoEdicion, setModoEdicion, tareaEdicion }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [tarea, setTarea] = useState(tareaEdicion ?? TAREA_INICIAL);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (tareaEdicion) {
      setTarea(tareaEdicion);
    } else {
      setTarea(TAREA_INICIAL);
    }
  }, [tareaEdicion])

  const validarFormulario = () => {
    if (!tarea.titulo.trim()) {
      setErrorMsg("El título es obligatorio");
      return false;
    }
    if (tarea.titulo.trim().length < 3) {
      setErrorMsg("El título debe tener al menos 3 caracteres");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    if (modoEdicion) {
      dispatch(actualizarTarea({ id: modoEdicion, titulo: tarea.titulo, estado: tarea.estado }));
      setModoEdicion(null);
    } else {
      dispatch(agregarTarea({ titulo: tarea.titulo, estado: tarea.estado }));
    }
    setTarea(TAREA_INICIAL);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTarea(prev => ({ ...prev, [name]: value }));

    if (errorMsg && name === "titulo" && value.trim()) setErrorMsg("");
  };

  const cancelarEdicion = () => {
    setTarea(TAREA_INICIAL);
    setModoEdicion(null);
    setErrorMsg("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errorMsg && <span className={styles.error}>{errorMsg}</span>}
      <div className={styles.inputGroup}>
        <input
          type="text"
          name="titulo"
          value={tarea.titulo}
          onChange={handleChange}
          placeholder="Título..."
          className={styles.input}
        />
        <select
          name="estado"
          value={tarea.estado}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="hacer">hacer</option>
          <option value="haciendo">haciendo</option>
          <option value="terminado">terminado</option>
        </select>
      </div>
      <button type="submit" className={styles.button}>
        {modoEdicion ? "Actualizar" : "Agregar"}
      </button>
      {modoEdicion && (
        <button
          type="button"
          onClick={cancelarEdicion}
          className={`${styles.button} ${styles.cancel}`}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
