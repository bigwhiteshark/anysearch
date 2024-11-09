import { EndPoint, DEFAULT_SEARCH_ENGINE_TIMEOUT } from "../constant";
import { httpRequest } from "../utils";

export const searchWithGoogle = async (query: string) => {
    if (!query.trim()) return [];
    try {
        const key = process.env.GOOGLE_SEARCH_KEY;
        const id = process.env.GOOGLE_SEARCH_ID;
        const res = await httpRequest({
            method: 'GET',
            url: EndPoint.GOOGLE_SEARCH_ENDPOINT,
            query: {
                key,
                cx: id,
                q: query
            },
            timeout: DEFAULT_SEARCH_ENGINE_TIMEOUT
        });
        console.log('google res==>', res)
        const result = await res.json();
        const list = result.items ?? [];
        return list.map((item: any, index: number) => {
            return {
                id: index + 1,
                name: item.title,
                url: item.link,
                formattedUrl: item.formattedUrl,
                snippet: item.snippet,
                imageLink: item.image?.thumbnailLink,
                imageContextLink: item.image?.contextLink
            };
        });
    } catch (err) {
        console.error('Google Search Error:', err);
        return [];
    }
};