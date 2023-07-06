type CommitInfo = {
    id: string,
    short: string,
    date: string
};

type NavItem = {
  name: string,
  icon: JSX.Element,
  to: string,
  key: string,
  navLink: boolean
}

type SiteInfo = {
  title: string,
  icon: string,
  link: string,
  lastCommit: CommitInfo
}
type SiteInfoSet = {
  [site: string]: SiteInfo
};
