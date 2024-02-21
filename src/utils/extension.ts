export {};
declare global {
  interface Array<T> {
    options(correct: string): string[];
  }
}
