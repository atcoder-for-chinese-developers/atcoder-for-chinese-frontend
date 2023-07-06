import { Outlet, useParams, useRouteLoaderData } from "react-router-dom";

export async function loader({ params }: any) {
    let res = await fetch(`${process.env.REACT_APP_ARTICLES_PATH}/${params.site}/${params.contest}/${params.problem}/list.json`);
    if (!res.ok) {
        if (res.status === 404) {
            let articles = {translations: {}, solutions: {}} as ProblemArticleSet;
            return { articles };
        }
    } else {
        let articles = (await res.json()) as ProblemArticleSet;
        return { articles };
    }
}

export default function ProblemRoute() {
    const {contest, problem} = useParams() as {[id: string]: string};
    const {siteData} = useRouteLoaderData('site') as {siteData: SiteData};
    if (!siteData.contests[contest] || !siteData.contests[contest].problems[problem]) throw new Response('', {status: 404, statusText: 'Not Found'});
    return <Outlet />
}
