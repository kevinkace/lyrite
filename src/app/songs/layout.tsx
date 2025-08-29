import { SongProvider } from "@/contexts/songContext";

export default function Layout({children, params}: {
    children: React.ReactNode;
    params: { slug?: string };
}) {
    return (
        <SongProvider slug={params.slug}>
            {children}
        </SongProvider>
    );
}
