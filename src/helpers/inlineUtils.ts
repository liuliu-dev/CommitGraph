export function pluralize(num: number, str: string): string {
  return num === 1 ? str : `${str}s`;
}

export function excerpt(str: string, len = 100): string {
  if (str.length <= len) return str;
  return `${str.slice(0, len)}...`;
}
