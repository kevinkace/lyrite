import { SongProvider } from "@/contexts/SongContext";


export default function SongPage({ children, params }: { children: React.ReactNode, params: { id: string } }) {
  return (
    <SongProvider id={params.id}>
        {children}
    </SongProvider>
  );
}
