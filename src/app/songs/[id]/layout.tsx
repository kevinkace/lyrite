import { SongProvider } from "@/contexts/SongContext";

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: `lyrite - edit song ${params.id}`,
    };
}


export default function SongPage({ children, params }: { children: React.ReactNode, params: { id: string } }) {
  return (
    <SongProvider id={params.id}>
        {children}
    </SongProvider>
  );
}
