export function dateShort(value: string | number | undefined) {
    if (!value) {
        return null;
    }

    try {
        value = new Date(value).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } catch {
        value = "Invalid date";
    }

    return value;
}

export function dateLong(value: string | number | undefined) {
    if (!value) {
        return null;
    }

    try {
        value = new Date(value).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    } catch {
        value = "Invalid date";
    }
    return value;
}

export function formatReleaseDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};