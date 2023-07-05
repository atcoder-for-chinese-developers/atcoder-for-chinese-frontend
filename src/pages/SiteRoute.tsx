import { Outlet, useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import { fetchObject } from "../js/utils";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export async function loader({ params }: any) {
    let site = params.site as string;
    let siteData = await fetchObject(`${process.env.REACT_APP_SPIDERS_PATH}/${site}/data.json`) as SiteData;
    let problemStats = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/${site}/list.json`) as ProblemStatSet;
    return { siteData, problemStats };
}

export default function SiteRoute() {
    const {lastCommit} = useRouteLoaderData('home') as {lastCommit: CommitInfo};
    const { siteData } = useLoaderData() as { siteData: SiteData };
    const { site } = useParams() as { site: string };

    let navItems = [] as NavItem[];

    navItems.push({
        name: '全部',
        key: 'all',
        to: `/${site}`,
        icon: <i className="icon" style={{color: '#000'}}>◎</i>,
        navLink: false
    });
    for (const id in siteData.categories) {
        const category = siteData.categories[id];
        navItems.push({
            name: category.title,
            key: id,
            to: `/${site}/${id}`,
            icon: <i className="icon" style={{color: category.color}}>◉</i>,
            navLink: true
        });
    }

    return (<>
        <Nav navItems={navItems} />
        <Outlet />
        <Footer lastCommit={lastCommit} />
    </>)
}