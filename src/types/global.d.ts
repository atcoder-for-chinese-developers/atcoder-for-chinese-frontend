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

type Dict<T> = {
  [id: string]: T
};
