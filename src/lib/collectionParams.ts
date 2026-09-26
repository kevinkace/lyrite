export function getCollectionParams(searchParams: URLSearchParams) {
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const search = searchParams.get("search") ?? "";
    const sortParam = searchParams.get("sort");
    const sort = sortParam === "none" ? "" : sortParam ?? undefined;
    const direction = searchParams.get("direction");

    return {
        page,
        search,
        sort,
        sortAscending: direction !== "desc",
    };
}