import { useSongs } from "@/contexts/SongsContext";

import SongsList from "./SongsList";

// todo: move to Supabase


export default function FeaturedSongs() {
    const { songs, loading } = useSongs();

    if (loading || songs === undefined) return <p>Loading…</p>;

    return <SongsList songs={songs} />;
}
