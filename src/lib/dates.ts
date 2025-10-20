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

export function formattedDay(value: string | number | undefined) {
    if (!value) {
        return null;
    }

    try {
        value = new Date(value).toLocaleDateString();
    } catch {
        value = "Invalid date";
    }
    return value;
}