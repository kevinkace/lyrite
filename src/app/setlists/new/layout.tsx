import Layout from "@/components/layout/Layout";

export default function SongLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <Layout bg="mesh">
            {children}
        </Layout>
    );
}
