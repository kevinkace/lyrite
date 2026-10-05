import { UserProvider } from "@/contexts/UserContext";

type Props = {
    children: React.ReactNode;
    params: Promise<{ userId: string }>;
};

export default async function UserSongsLayout({ children, params }: Props) {
    const { userId } = await params;

    return (
        <UserProvider userId={userId}>
            {children}
        </UserProvider>
    );
}
