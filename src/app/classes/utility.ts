export function nullOrUndefined(input: any): boolean {
    return (input === null || input === undefined);
}
export function notNullAndUndefined(input: any): boolean {
    return !nullOrUndefined(input);
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
export function getCookie(name: string): string {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}