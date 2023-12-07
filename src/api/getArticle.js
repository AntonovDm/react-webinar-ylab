export default async function getArticle(articleId) {
  try {
    const response = await fetch(
      `/api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch article. Status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}
