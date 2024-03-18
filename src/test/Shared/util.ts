export function getRandomInt({ min, max }: { min?: number, max?: number } = {}): number {
    min = Math.ceil(min || 0);
    max = Math.floor(max || 100);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
