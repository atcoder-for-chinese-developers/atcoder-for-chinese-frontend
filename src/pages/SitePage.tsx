import { useParams, useRouteLoaderData } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ContestList from "../components/ContestList";
import "./SitePage.css"

export default function SitePage() {
    const {contests, contestSet, categorySet, problemSet} = useRouteLoaderData('site') as SiteRouteData;
    const {category, site} = useParams() as {category: string | undefined, site: string};

    let showedContests = [] as Contest[];
    if (!category) showedContests = contests;
    else {
        if (!categorySet[category]) throw new Response('', { status: 404, statusText: 'Not Found' });
        for (const id of categorySet[category].contests) showedContests.push(contestSet[id]);
    }

    return (
        <>
            <Container className="contestlist-container">
                <ContestList data={showedContests} site={site} problemSet={problemSet}/>
            </Container>
        </>
    );
}