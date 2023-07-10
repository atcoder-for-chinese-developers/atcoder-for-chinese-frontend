import { Outlet, useParams, useRouteLoaderData } from "react-router-dom";

export async function loader({ params }: any): Promise<ProblemRouteData> {
    let res = await fetch(`${process.env.REACT_APP_ARTICLES_PATH}/${params.site}/${params.problem}/list.json`);
    if (!res.ok) {
        if (res.status === 404) {
            return { translations: [], solutions: [] };
        }
        throw res;
    } else {
        let articles = (await res.json()) as ProblemArticleSet;
        return { translations: articles.translations, solutions: articles.solutions };
    }
}

export default function ProblemRoute() {
    const {problem} = useParams() as {problem: string};
    const {problemSet} = useRouteLoaderData('site') as SiteRouteData;
    if (!problemSet[problem]) throw new Response('', {status: 404, statusText: 'Not Found'});
    return <Outlet />
}
