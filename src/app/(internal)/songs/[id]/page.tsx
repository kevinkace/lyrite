import EditSong from "@/components/song/EditSong";

export default function SongPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>

      <EditSong />
    </>
  );
}
