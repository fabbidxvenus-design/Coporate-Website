// JSON serialization helpers for SQLite storage

export function parseJson<T>(value: string | null | undefined, defaultValue: T): T {
  if (value === null || value === undefined || value === '') {
    return defaultValue;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

export function stringifyJson<T>(value: T): string {
  try {
    return JSON.stringify(value);
  } catch {
    return '[]';
  }
}

export function parseJsonOptional<T>(value: string | null | undefined): T | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}