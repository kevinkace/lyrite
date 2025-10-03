import { SongProvider } from "@/contexts/SongContext";

export default async function SongPage({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <SongProvider id={id}>
            {children}
        </SongProvider>
    );
}
