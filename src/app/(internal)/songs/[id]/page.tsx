import EditSong from "@/components/song/EditSong";
import { EditingProvider } from "@/contexts/EditingContext";

export default function SongPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>

    <EditingProvider>
      <EditSong />
    </EditingProvider>
    </>
  );
}
