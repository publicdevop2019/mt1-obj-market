export function onCategoriesPageHeader(): boolean {
    const regex2 = new RegExp('/categories/');
    return (
        regex2.test(location.pathname) &&
        location.pathname.match(new RegExp(/\//gi)).length === 2
    );
}
export function onHomeHeader(): boolean {
    const regex2 = new RegExp('/home');
    return regex2.test(location.pathname);
}
export function onSearchHeader(): boolean {
    const regex2 = new RegExp('/search');
    return regex2.test(location.pathname);
}
export function notNullAndUndefined(input: any): boolean {
    return !(input === null || input === undefined);
}
export function notNullAndUndefinedAndEmptyString(input: any): boolean {
    return !(input === null || input === undefined || input === '');
}
export function safelyGetValue<T>(fn: () => T, def?: T): T | undefined {
    try {
        return fn() || def;
    } catch (e) {
        return undefined || def;
    }
}
