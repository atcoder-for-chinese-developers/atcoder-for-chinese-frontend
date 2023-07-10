import { Outlet, useLoaderData } from "react-router-dom";
import { fetchObject } from "../js/utils";
import Footer from "../components/Footer";

export async function loader(): Promise<HomeRouteData> {
    let siteList = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/list.json`) as {[id: string]: CommitInfo};
    let nativeSiteInfo = await fetchObject(`${process.env.REACT_APP_SPIDERS_PATH}/list.json`) as SiteInfoSet;
    let lastCommit = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/commitInfo.json`) as CommitInfo;
    let siteInfos = {} as SiteInfoSet;
    for (const site in siteList) {
        if (nativeSiteInfo[site]) {
            siteInfos[site] = nativeSiteInfo[site];
            siteInfos[site].lastCommit = siteList[site];
        }
    }
    return { siteInfos, lastCommit };
}

export default function HomeRoute() {
    const {lastCommit, siteInfos} = useLoaderData() as HomeRouteData;
    return (
        <>
            <Outlet />
            <Footer lastCommit={lastCommit} siteInfos={siteInfos}/>
        </>
    )
}
