import { useSong } from "@/contexts/SongContext";

import css from "./page.module.css";

export default function EditSong() {
  const { song, loading } = useSong();

  if (loading) return <p>Loading…</p>;
  if (!song) return <p>Song not found</p>;

  return (
    <>
      <pre className={css.lyrics}>{song.lyrics}</pre>
    </>
  );
}
