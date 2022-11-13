export type Problem = {
    id: string,
    contest_id: string,
    problem_index: string,
    name: string,
    title: string,
    difficulty: number | null
};

export type ProblemSet = {
    [index: string]: Problem
};

export type Contest = {
    id: string,
    start_epoch_second: number,
    duration_second: number,
    title: string,
    rate_change: string,
    problems: ProblemSet
};

export type ContestSet = {
    [index: string]: Contest
};

export type ContestsData = {
    [index: string]: ContestSet
};

export type CommitInfo = {
    id: string,
    short: string,
    date:string 
};

export type Article = {
    title: string,
    tags: Array<string>,
    author: string,
    created: string,
    lastCommit: CommitInfo
};

export type ArticleSet = {
    [index: string]: Article
};

export type ContestArticleSet = {
    [index: string]: ArticleSet
};

export type ArticleList = {
    [index: string]: ContestArticleSet
};

export type ArticleListData = {
    lastCommit: CommitInfo,
    data: ArticleList
};

export type GlobalData = {
    contests: ContestsData,
    translations: ArticleListData,
    solutions: ArticleListData,
    ready: Boolean
};
