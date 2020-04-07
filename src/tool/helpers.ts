import {isObject, transform} from 'lodash';

export const asyncForEach: (array: any[], callback: (element: any) => Promise<void>) => Promise<void> = async (array, callback) => {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < array.length; index++) {
        await callback(array[index]);
    }
};

/**
 * Object diff: base object minus object
 * Comparison based on keys
 * @param base object
 * @param object to subtract
 */
export const objectDiff: (base: any, obj: any) => any = (base, obj) => {
    return transform(base, (result: any, value: any, key: string) => {
        if (obj[key] === undefined || (isObject(base[key]) && Object.keys(base[key]).length > 0 && !isObject(obj[key]))) {
            result[key] = value;
        } else if (isObject(base[key]) && isObject(obj[key])) {
            const child: object = objectDiff(base[key], obj[key]);
            if (Object.keys(child).length > 0) {
                result[key] = child;
            }
        }
    });
};
