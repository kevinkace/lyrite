"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Switch, Text, TextField } from "@radix-ui/themes";
import { Plus } from "lucide-react";

import { useSetlists } from "@/contexts/SetlistsContext";

export default function SetlistForm() {
    const router = useRouter();
    const { createSetlist } = useSetlists();
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!title.trim()) return;

        setSaving(true);
        try {
            const setlist = await createSetlist(title.trim(), isPublic);
            router.push(`/setlists/${setlist.id}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Flex direction="column" gap="4" align="stretch" asChild>
            <form onSubmit={handleSubmit}>
                <TextField.Root
                    name="title"
                    placeholder="Setlist name"
                    value={title}
                    maxLength={100}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Text as="label">
                    <Flex gap="2" align="center">
                        <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                        public?
                    </Flex>
                    <Text size="2" color="gray" mt="1">
                        Public setlists can be viewed by anyone.
                    </Text>
                </Text>
                <Button type="submit" disabled={saving}>
                    <Plus />
                    {saving ? "Creating..." : "Create setlist"}
                </Button>
            </form>
        </Flex>
    );
}