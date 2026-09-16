import Layout from "@/components/layout/Layout";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}
