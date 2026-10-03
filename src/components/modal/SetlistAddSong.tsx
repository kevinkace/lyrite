"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Flex, CheckboxGroup, Text, TextField } from "@radix-ui/themes";

import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useMinimumTimer } from "@/hooks/useMinimumTimer";
import type { Song } from "@/types";


export default function SetlistAddSong({
    closeModal,
    onAdd,
}: {
    closeModal: () => void;
    onAdd: (songId: string) => Promise<void>;
}) {
    const { user } = useAuth();
    const [songs, setSongs] = useState<Song[]>([]);
    const [search, setSearch] = useState("");
    const [selectedSong, setSelectedSong] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const minLoading = useMinimumTimer(loading, 500);

    // get initial songs
    useEffect(() => {
        if (!user) return;

        const loadSongs = async () => {
            setLoading(true);

            const { data, error: fetchError } = await supabase
                .from("songs")
                .select("*")
                .eq("user_id", user.id)
                .order("updated_at", { ascending: false })
                .limit(1);

            if (fetchError) {
                setError(fetchError.message);
            } else {
                setSongs((data || []) as Song[]);
            }

            setLoading(false);
        };

        void loadSongs();
    }, [user]);

    const handleAdd = async () => {
        if (!selectedSong) return;

        setSaving(true);
        setError(null);

        try {
            await onAdd(selectedSong);
            closeModal();
        } catch (addError) {
            setError(addError instanceof Error ? addError.message : "Unable to add song");
        } finally {
            setSaving(false);
        }
    };

    // typeahead
    useEffect(() => () => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userId = user?.id;
        if (!userId) return;

        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        const loadSongs = async () => {
            setLoading(true);
            setError(null);
            let query = supabase
                .from("songs")
                .select("*")
                .eq("user_id", userId);

            if (searchValue.trim()) {
                query = query.ilike("title", `%${searchValue.trim()}%`);
            }

            const { data, error: fetchError } = await query
                .order("updated_at", { ascending: false })
                .limit(5);

            if (fetchError) {
                setError(fetchError.message);
            } else {
                setSongs((data || []) as Song[]);
            }

            setLoading(false);
        };

        searchTimeout.current = setTimeout(() => void loadSongs(), 300);
    };

    return (
        <Flex direction="column" gap="3">
            <TextField.Root
                placeholder="Search recent songs"
                value={search}
                onChange={handleSearch}
            />

            {minLoading && <Text color="gray">Loading songs...</Text>}
            {error && <Text color="red">{error}</Text>}
            {!loading && !error && songs.length === 0 && (
                <Text color="gray">No matching songs found.</Text>
            )}

            {!error && songs.length > 0 && (
                <CheckboxGroup.Root value={selectedSong} onValueChange={setSelectedSong}>
                    <Flex direction="column" gap="2">
                        {songs.map((song) => (
                            <Flex key={song.id} align="center" gap="2">
                                <CheckboxGroup.Item value={song.id} id={`song-${song.id}`} />
                                <Text as="label" htmlFor={`song-${song.id}`}>
                                    {song.title}
                                    <Text as="span" color="gray"> - {song.artist}</Text>
                                    <Text as="span" color="gray"> - {song.lyrics.slice(-50)}</Text>
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </CheckboxGroup.Root>
            )}

            <Flex justify="end" gap="2">
                <Button variant="soft" onClick={closeModal}>
                    Cancel
                </Button>
                <Button disabled={!selectedSong || saving || loading} onClick={handleAdd}>
                    {saving ? "Adding..." : "Add"}
                </Button>
            </Flex>
        </Flex>
    );
}
