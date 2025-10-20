import { SongProvider } from "@/contexts/SongContext";

import Layout from "@/components/layout/Layout";

export default async function SongLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userId?: string; slug?: string }>;
}) {
    const { userId, slug } = await params;

    return (
        <Layout bg="mesh">
            <SongProvider userId={userId} slug={slug}>
                {children}
            </SongProvider>
        </Layout>
    );
}
