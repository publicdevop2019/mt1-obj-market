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
