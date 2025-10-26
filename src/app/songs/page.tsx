import Layout from "@/components/layout/Layout"
import SongsTable from "@/components/songs/SongsTable";
import { SongsProvider } from "@/contexts/SongsContext";

export default function SongsPage() {
    return (
        <Layout>
            <div>
                <h1>Songs</h1>

                <SongsProvider>
                    <SongsTable />
                </SongsProvider>
            </div>
        </Layout>
    );
}
