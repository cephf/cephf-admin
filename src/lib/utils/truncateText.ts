export function truncateText(text: string, maxLength = 50): string {
    if (!text) return "";
  
    return text.length <= maxLength
      ? text
      : `${text.slice(0, maxLength).trim()}...`;
  }