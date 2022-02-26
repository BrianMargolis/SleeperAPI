export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (v, k) => k + start);
}

export async function sleep(n: number) {
    return new Promise(resolve => setTimeout(resolve, n));
}

export function log(message: string) {
    console.log(`${Date.now()}\n${message}`)
}