import Layout from "@/components/layout/Layout";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout page="login">
            {children}
        </Layout>
    );
}