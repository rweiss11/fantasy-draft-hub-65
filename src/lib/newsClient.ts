export interface NewsHeadline {
  title: string;
  source?: string;
  publishedAt?: string;
}

/**
 * Fetches latest NFL news for a given player name.
 * Returns an array of headlines or empty array on failure.
 * 
 * Developer can later integrate a real news API by updating this function.
 */
export async function fetchPlayerNews(
  playerName: string
): Promise<NewsHeadline[]> {
  try {
    // Placeholder for future news API integration
    // const NEWS_API_KEY = "...";
    // const NEWS_API_URL = "...";
    
    // For now, return empty array
    // When real API is added, implement fetch logic here
    return [];
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
}

/**
 * Formats news headlines into a system message for Claude.
 */
export function formatNewsForPrompt(news: NewsHeadline[]): string {
  if (news.length === 0) {
    return "";
  }

  const bullets = news.map((item) => `• ${item.title}`).join("\n");
  return `Latest relevant news:\n${bullets}`;
}
