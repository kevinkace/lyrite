"use client";

import { useState } from "react";

import { Button, Flex } from "@radix-ui/themes";

import { useModal } from "@/contexts/ModalContext";

export default function SettingsPage() {
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure? This will permanently delete your account.")) return;
        setLoading(true);

        try {
            const res = await fetch("/api/delete-account", { method: "POST" });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to delete account");

            alert("Your account has been deleted.");
            window.location.href = "/goodbye";
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex direction="column" gap="4" align="start">
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
    );
}
