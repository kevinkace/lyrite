import { SongsProvider } from "@/contexts/songsContext";

export default function Layout({ children, params }: { children: React.ReactNode; params: { username: string } }) {
    return (
        <SongsProvider username={params.username}>
            {children}
        </SongsProvider>
    );
}
