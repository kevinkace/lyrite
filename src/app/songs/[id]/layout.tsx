import { SongProvider } from "@/contexts/SongContext";

import Layout from "@/components/layout/Layout";

export default async function SongPage({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <Layout>
            <SongProvider id={id}>
                {children}
            </SongProvider>
        </Layout>
    );
}
