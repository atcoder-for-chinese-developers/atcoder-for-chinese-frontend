type Difficulty = {
    type: 'normal' | 'medal',
    color: string,
    textColor: string,
    rate: number,
    value: number
};

type Problem = {
    id: string,
    title: string,
    link: string | null,
    difficulty: Difficulty | null,
    stats: number[]
};
type ContestProblem = {
    id: string,
    index: string
}

type Contest = {
    title: string,
    id: string,
    link: string | null,
    problems: ContestProblem[]
};

type Category = {
    title: string,
    id: string,
    color: string,
    contests: string[]
};

type NativeSiteData = {
    categories: Category[],
    contests: Contest[],
    problems: Problem[]
}

type ProblemStat = number[2];
type ProblemStatSet = {
    [id: string]: ProblemStat
};

type SiteRouteData = {
    contests: Contest[],
    problems: Problem[],
    categories: Category[],
    problemSet: Dict<Problem>,
    categorySet: Dict<Category>,
    contestSet: Dict<Contest>
};
