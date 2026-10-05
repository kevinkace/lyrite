export const PAGE_SIZE_OPTIONS = [12, 24, 60] as const;
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];

export function normalizePageSize(value: string | string[] | null | undefined) {
    const rawValue = Array.isArray(value) ? value[0] : value;
    const pageSize = Number(rawValue);

    return PAGE_SIZE_OPTIONS.find((option) => option === pageSize) ?? DEFAULT_PAGE_SIZE;
}

export function createPageChangeHandler(
    searchParams: string,
    setLoading: (loading: boolean) => void,
    navigate: (href: string) => void
) {
    return (page: number) => {
        setLoading(true);

        const params = new URLSearchParams(searchParams);
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }
        navigate(`?${params.toString()}`);
    };
}

export function createPageSizeChangeHandler(
    searchParams: string,
    setLoading: (loading: boolean) => void,
    navigate: (href: string) => void
) {
    return (pageSize: number) => {
        setLoading(true);

        const params = new URLSearchParams(searchParams);
        params.delete("page");
        if (pageSize === DEFAULT_PAGE_SIZE) {
            params.delete("pageSize");
        } else {
            params.set("pageSize", pageSize.toString());
        }
        navigate(`?${params.toString()}`);
    };
}
