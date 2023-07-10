import { fetchObject } from "../js/utils";

export async function loader({params}: any): Promise<ArticleRouterData> {
    if (params.type !== 't' && params.type !== 's') throw new Response('', {status: 404, statusText: 'Not Found'});
    let type = 'solutions';
    if (params.type === 't') type = 'translations';
    let article = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/${params.site}/${params.problem}/${type}/${params.id}/data.json`) as NativeArticleData;
    return Object.assign(article.articleInfo, {rendered: article.rendered});
}
