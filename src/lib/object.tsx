
export function getByPath(obj: object, path: string): any {
    return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}
