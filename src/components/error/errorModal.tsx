"use client";

import { IconButton } from "@radix-ui/themes";
import styles from "./errorModal.module.css";

import { useError } from "@/contexts/ErrorContext";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function ErrorModal() {
    const { error, setError } = useError();

    if (!error) return null;

    return (
        <div className={styles.backdrop} onClick={() => setError(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p>{error}</p>
                <IconButton onClick={() => setError(null)}>
                    <Cross2Icon/>
                </IconButton>
            </div>
        </div>
    );
}
