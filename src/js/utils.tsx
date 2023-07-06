export async function fetchObject(url: string) {
    let res = await fetch(url);
    if (!res.ok) throw res;
    return res.json();
}
