import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { fetchObject, toDict } from "../js/utils";
import Nav from "../components/Nav";

export async function loader({ params }: any): Promise<SiteRouteData> {
    let site = params.site as string;
    let siteData = await fetchObject(`${process.env.REACT_APP_SPIDERS_PATH}/${site}/data.json`) as NativeSiteData;
    let problemStats = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/${site}/list.json`) as ProblemStatSet;
    for (const i in siteData.problems) {
        siteData.problems[i].stats = problemStats[siteData.problems[i].id] || [0, 0];
    }
    return {
        contests: siteData.contests,
        problems: siteData.problems,
        categories: siteData.categories,
        problemSet: toDict(siteData.problems, (i, v) => v.id),
        categorySet: toDict(siteData.categories, (i, v) => v.id),
        contestSet: toDict(siteData.contests, (i, v) => v.id)
    };
}

export default function SiteRoute() {
    const { categories } = useLoaderData() as SiteRouteData;
    const { site } = useParams() as { site: string };

    let navItems = [] as NavItem[];

    navItems.push({
        name: '全部',
        key: 'all',
        to: `/${site}`,
        icon: <i className="icon" style={{color: '#000'}}>◎</i>,
        navLink: false
    });
    for (const category of categories) {
        navItems.push({
            name: category.title,
            key: category.id,
            to: `/${site}/c/${category.id}`,
            icon: <i className="icon" style={{color: category.color}}>◉</i>,
            navLink: true
        });
    }

    return (<>
        <Nav navItems={navItems} />
        <Outlet />
    </>)
}