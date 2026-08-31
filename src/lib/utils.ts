/**
 * Sanitizes a string for use as a data-testid attribute
 * Converts to lowercase and replaces spaces and special characters with hyphens
 */
export function sanitizeTestId(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
