import EditSong from "@/components/song/EditSong";
import { EditingProvider } from "@/contexts/EditingContext";

export default function SongPage() {
    return (
        <>
            <EditingProvider>
                <EditSong />
            </EditingProvider>
        </>
    );
}
