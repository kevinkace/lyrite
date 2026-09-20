import { SongsProvider } from "@/contexts/SongsContext";
import { UserProvider } from "@/contexts/UserContext";

type Props = {
    children: React.ReactNode;
    params: Promise<{ userId: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UserSongsPage({ children, params, searchParams }: Props) {
    const { userId } = await params;
    const sp = await searchParams;

    const page = parseInt(
        (Array.isArray(sp?.page) ? sp?.page[0] : sp?.page) || "1",
        10
    );
    const search = Array.isArray(sp?.search) ? sp?.search[0] : sp?.search || "";
    const sortParam = Array.isArray(sp?.sort) ? sp?.sort[0] : sp?.sort;
    const sort = sortParam === "none" ? "" : sortParam;
    const direction = Array.isArray(sp?.direction) ? sp?.direction[0] : sp?.direction;

    return (
        <UserProvider userId={userId}>
            <SongsProvider
                userId={userId}
                page={page}
                search={search}
                sort={sort}
                sortAscending={direction !== "desc"}
            >
                {children}
            </SongsProvider>
        </UserProvider>
    );
}
