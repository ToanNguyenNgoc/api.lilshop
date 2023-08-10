export const sortObject = (obj: Record<string, any>): Record<string, any> => {
    const sorted: Record<string, any> = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
};