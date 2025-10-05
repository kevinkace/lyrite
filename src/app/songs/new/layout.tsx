import { SongProvider } from "@/contexts/SongContext";

export default async function SongLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userId?: string; slug?: string }>;
}) {
    const { userId, slug } = await params;

    return (
        <SongProvider userId={userId} slug={slug}>
            {children}
        </SongProvider>
    );
}
