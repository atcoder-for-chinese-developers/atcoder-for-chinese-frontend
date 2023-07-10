export async function fetchObject(url: string) {
    let res = await fetch(url);
    if (!res.ok) throw res;
    return res.json();
}

export function toDict<T>(arr: T[], f: (index: number, value: T) => string): Dict<T> {
    let ret = {} as Dict<T>;
    for (let i = 0; i < arr.length; i++) {
        ret[f(i, arr[i])] = arr[i];
    }
    return ret;
}
