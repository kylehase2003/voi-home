/**
 * Get translated content with fallback to English
 */
export function getTranslatedContent<T extends Record<string, any>>(
  item: T,
  field: string,
  language: string
): string {
  // If English or field doesn't need translation, return as is
  if (language === 'en') {
    return item[field] || '';
  }

  // Try to get translated version
  const translatedField = `${field}_${language}`;
  const translatedValue = item[translatedField];

  // If translation exists and is not empty, use it
  if (translatedValue && translatedValue.trim() !== '') {
    return translatedValue;
  }

  // Fallback to English
  return item[field] || '';
}

/**
 * Get translated tags array with fallback to English
 */
export function getTranslatedTags<T extends Record<string, any>>(
  item: T,
  language: string
): string[] {
  // If English, return default tags
  if (language === 'en') {
    return Array.isArray(item.tags) ? item.tags : [];
  }

  // Try to get translated tags
  const translatedField = `tags_${language}`;
  const translatedTags = item[translatedField];

  // If translation exists and has items, use it
  if (Array.isArray(translatedTags) && translatedTags.length > 0) {
    return translatedTags;
  }

  // Fallback to English tags
  return Array.isArray(item.tags) ? item.tags : [];
}

/**
 * Get all translations for a field
 */
export function getAllTranslations<T extends Record<string, any>>(
  item: T,
  field: string
): { en: string; ar: string; ru: string } {
  return {
    en: item[field] || '',
    ar: item[`${field}_ar`] || '',
    ru: item[`${field}_ru`] || '',
  };
}
