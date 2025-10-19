export function formattedDate(value: string | number | undefined) {
    if (!value) {
        return null;
    }

    try {
        value = new Date(value).toLocaleString();
    } catch {
        value = "Invalid date";
    }

    return value;
}
