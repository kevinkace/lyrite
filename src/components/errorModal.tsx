"use client";

import styles from "./errorModal.module.css";

import { useError } from "@/contexts/errorContext";

export default function ErrorModal() {
    const { error, setError } = useError();

    if (!error) return null;

    return (
        <div className={styles.backdrop} onClick={() => setError(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p>{error}</p>
                <button onClick={() => setError(null)}>Close</button>
            </div>
        </div>
    );
}
