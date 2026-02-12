export const categories = ["سنتی", "صبحانه", "ناهار", "شام"];

export function validateCategory(input: string | null | undefined) {
  if (!input) {
    return undefined;
  }
  if (categories.indexOf(input) > -1) {
    return input;
  }
  return undefined;
}
