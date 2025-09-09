import { useSongsByIds } from "@/contexts/songsContext";

import SongsList from "./SongsList";

// todo: move to Supabase
const featuredIds = [
    "8cb14731-d89e-4159-81f4-491187ba2b52",
    "9e943dc9-e852-4dbc-9cdc-cd450cb59ed9"
];

export default function FeaturedSongs() {
    const { songs, loading } = useSongsByIds(featuredIds);

    if (loading) return <p>Loading…</p>;

    return <SongsList songs={songs} />;
}