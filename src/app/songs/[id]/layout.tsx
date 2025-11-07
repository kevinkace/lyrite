import Layout from "@/components/layout/Layout";

export default function SongPage({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {

    return (
        <Layout>
            {children}
        </Layout>
    );
}
