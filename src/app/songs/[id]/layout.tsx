import { SongProvider } from "@/contexts/SongContext";
import { use } from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: `lyrite - edit song ${params.id}`,
    };
}


export default function SongPage({ children, params }: { children: React.ReactNode, params: { id: string } }) {
  const { id } = use(params);

  return (
    <SongProvider id={id}>
        {children}
    </SongProvider>
  );
}
