import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ModalConfirm.module.css";

interface Props {
    isOpen: boolean;
    title?: string;
    message?: string | ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ModalConfirm = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Abrir/cerrar el <dialog> en sincronía con el estado
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    // Detectar click fuera del modal
    const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
        const dialog = dialogRef.current;
        if (dialog && e.target === dialog) {
            onCancel();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            onClick={handleClickOutside}
        >
            <div className={styles.modal}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {message && <p className={styles.message}>{message}</p>}
                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button className={styles.confirm} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ModalConfirm;
