import vi from './vi.json';
import ja from './ja.json';

const dictionaries = { vi, ja };

export type Locale = keyof typeof dictionaries;
export const getDictionary = (locale: Locale) => dictionaries[locale];
