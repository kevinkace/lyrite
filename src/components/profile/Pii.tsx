"use client";

import { useState } from "react";

import { Button, Card, Flex } from "@radix-ui/themes";

import { useModal } from "@/contexts/ModalContext";

import css from "./ProfileData.module.css";

export function Pii() {
    const [, setLoading] = useState(false);
    const { openModal } = useModal();

    const handleDelete = async () => {
        if (!confirm("Are you sure? This will permanently delete your account.")) return;
        setLoading(true);

        try {
            const res = await fetch("/api/delete-account", { method: "POST" });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to delete account");

            alert("Your account has been deleted.");
            window.location.href = "/goodbye";
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Failed to delete account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card size="3" className={css.card}>
            <h4>Personal Data</h4>

            <p>
                Download your PII, or delete your account. <br/>
                Deleting your account is IMMEDIATE AND NON-RECOVERABLE. At least it should be.
            </p>
        <Flex gap="4">
        <Button
            onClick={() => {
                openModal({
                    type: "downloadPII",
                    title : "Download PII",
                    props: {
                        onDownload: () => {
                            console.log("Downloading PII...");
                        },
                    },
                });
            }}
        >
            Download PII
        </Button>

        <Button
            onClick={() => {
                openModal({
                    type: "confirm",
                    title: "Delete Account",
                    props: {
                        description : "Delete ALL your songs and account info.",
                        confirmRequirement : "delete account",
                        confirmCta : "Delete my account",
                        onConfirm: () => {
                            handleDelete();
                        },
                    },
                });
            }}
            color="red"
        >
            Delete Account
        </Button>
        </Flex>
        </Card>
    );
}