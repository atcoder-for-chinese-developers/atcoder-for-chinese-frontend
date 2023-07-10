type SiteInfo = {
  title: string,
  icon: string,
  link: string,
  lastCommit: CommitInfo
}
type SiteInfoSet = {
  [site: string]: SiteInfo
};
type HomeRouteData = {
    siteInfos: SiteInfoSet,
    lastCommit: CommitInfo
}
