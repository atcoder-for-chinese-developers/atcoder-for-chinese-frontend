type CommitInfo = {
    id: string,
    short: string,
    date:string 
};

type Article = {
    title: string,
    tags: Array<string>,
    author: string,
    created: string,
    lastCommit: CommitInfo
};

type ArticleSet = {
    [index: string]: Article
};

type ContestArticleSet = {
    [index: string]: ArticleSet
};

type ArticleList = {
    [index: string]: ContestArticleSet
};

type ArticleListData = {
    lastCommit: CommitInfo,
};

type GlobalData = {
    contests: ContestsData,
    translations: ArticleListData,
    solutions: ArticleListData,
    ready: Boolean
};

type Problem = {
    id: string,
    contest_id: string,
    problem_index: string,
    name: string,
    title: string,
    difficulty: number | null,
    translations: ArticleSet,
    solutions: ArticleSet
};

type ProblemSet = {
    [index: string]: Problem
};

type Contest = {
    id: string,
    start_epoch_second: number,
    duration_second: number,
    title: string,
    rate_change: string,
    problems: ProblemSet
};

type ContestSet = {
    [index: string]: Contest
};

type ContestsData = {
    [index: string]: ContestSet
};
