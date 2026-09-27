"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Card, Flex, Select } from "@radix-ui/themes";
import { ArrowLeft, ListMusic, Trash2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "@/contexts/LayoutContext";
import { useSetlists } from "@/contexts/SetlistsContext";
import { useSetlist } from "@/contexts/SetlistContext";
import { useSetlistEditing } from "@/contexts/SetlistEditingContext";
import { useSongs } from "@/contexts/SongsContext";

export default function SetlistEditor() {
    const id = useParams<{ id: string }>().id;
    const { user } = useAuth();
    const { setHeaderContent } = useLayout();
    const { setlist, loading, error } = useSetlist();
    const { deleteSetlist } = useSetlists();
    const { songs } = useSongs();
    const { selectedSong, setSelectedSong, saving, addSong, removeSong } = useSetlistEditing();

    useEffect(() => {
        if (!setlist) {
            setHeaderContent(null);
            return;
        }

        setHeaderContent(<h1>{setlist.title}</h1>);

        return () => setHeaderContent(null);
    }, [setHeaderContent, setlist]);

    const isOwner = !!user && !!setlist && user.id === setlist.user_id;
    const availableSongs = songs.filter((song) => !setlist?.songs.some((setlistSong) => setlistSong.id === song.id));

    const handleAdd = async () => {
        if (!selectedSong) return;

        await addSong(id);
    };

    const handleDelete = async () => {
        if (!setlist || !window.confirm(`Delete ${setlist.title}?`)) return;

        await deleteSetlist(setlist.id);
        window.location.href = "/setlists";
    };

    if (loading && !setlist) return <p>Loading setlist...</p>;
    if (!setlist) return <p>{error || "Setlist not found"}</p>;

    return (
        <Flex direction="column" gap="5">
            <Flex justify="between" align="center" gap="3">
                <Flex align="center" gap="3">
                    <ListMusic />
                    <strong>{setlist.is_public ? "Public setlist" : "Private setlist"}</strong>
                </Flex>
                {isOwner && <Button color="crimson" variant="soft" onClick={handleDelete}>
                    <Trash2 />
                    Delete
                </Button>}
            </Flex>

            {isOwner && <Flex direction={{ initial: "column", sm: "row" }} gap="3" align={{ initial: "stretch", sm: "center" }}>
                <Select.Root value={selectedSong} onValueChange={setSelectedSong}>
                    <Select.Trigger placeholder="Choose a song" />
                    <Select.Content>
                        {availableSongs.map((song) => <Select.Item key={song.id} value={song.id}>{song.title} - {song.artist}</Select.Item>)}
                    </Select.Content>
                </Select.Root>
                <Button onClick={handleAdd} disabled={!selectedSong || saving}>Add song</Button>
            </Flex>}

            {setlist.songs.length === 0 && <p>Your setlist is empty.</p>}
            <Flex direction="column" gap="2">
                {setlist.songs.map((song, index) => (
                    <Card key={song.id}>
                        <Flex align="center" justify="between" gap="3">
                            <Flex align="center" gap="3">
                                <strong>{index + 1}.</strong>
                                <Link href={`/songs/${song.id}`}><strong>{song.title}</strong> - {song.artist}</Link>
                            </Flex>
                            {isOwner && <Button variant="ghost" color="crimson" onClick={() => removeSong(id, song.id)} aria-label={`Remove ${song.title}`}>
                                <Trash2 />
                            </Button>}
                        </Flex>
                    </Card>
                ))}
            </Flex>
            <Link href="/setlists"><ArrowLeft /> Back to setlists</Link>
        </Flex>
    );
}