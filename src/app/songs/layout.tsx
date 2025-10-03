import Layout from "@/components/layout/Layout";

export default async function SongsLayout({ children }: { children: React.ReactNode }) {

    return (
        <Layout>
            {children}
        </Layout>
    );
}