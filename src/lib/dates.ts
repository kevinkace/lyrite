export function formattedDate(value: string | number) {
    try {
        value = new Date(value).toLocaleString();
    } catch {
        value = "Invalid date";
    }

    return value;
}
