export function capitalize(str: string | null): string {
    if(str == null) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}