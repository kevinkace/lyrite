import { useQuerySongs } from "@/contexts/SongsContext";

import { useAuth } from "@/contexts/AuthContext";


import SongsList from "./SongsList";

export default function FeaturedSongs() {
    const { user } = useAuth();

    // const { songs, loading } = useQuerySongs({
    //     userId: user?.id
    // });

    // console.log({songs});

    return <div>songslist</div>

    // if (loading || songs === undefined) return <p>Loading…</p>;

    // return <SongsList songs={songs} />;
}
