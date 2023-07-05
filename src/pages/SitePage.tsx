import { useParams, useRouteLoaderData } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ContestList from "../components/ContestList";
import "./SitePage.css"

export default function SitePage() {
    const {siteData, problemStats} = useRouteLoaderData('site') as {siteData: SiteData, problemStats: ProblemStatSet};
    const {category, site} = useParams() as {category: string | undefined, site: string};

    let showedContests = {} as ContestSet;
    if (!category) showedContests = siteData.contests;
    else {
        if (!siteData.categories[category]) throw new Response('', { status: 404, statusText: 'Not Found' });
        for (const id of siteData.categories[category].contests) showedContests[id] = siteData.contests[id];
    }

    return (
        <>
            <Container className="contestlist-container">
                <ContestList data={showedContests} problemStats={problemStats} site={site}/>
            </Container>
        </>
    );
}