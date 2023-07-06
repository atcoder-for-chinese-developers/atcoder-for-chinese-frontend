import { fetchObject } from "../js/utils";

export async function loader({params}: any) {
    if (params.type !== 'translations' && params.type !== 'solutions') throw new Response('', {status: 404, statusText: 'Not Found'});
    let article = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/${params.site}/${params.contest}/${params.problem}/${params.type}/${params.id}/data.json`) as ArticleData;
    return { article };
}
