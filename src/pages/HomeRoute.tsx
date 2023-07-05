import { fetchObject } from "../js/utils";

export async function loader() {
    let siteList = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/list.json`) as string[];
    let lastCommit = await fetchObject(`${process.env.REACT_APP_ARTICLES_PATH}/commitInfo.json`) as CommitInfo;
    let siteInfo = {} as SiteInfo;
    for (let site of siteList) siteInfo[site] = 1;
    return { siteInfo, lastCommit };
}
