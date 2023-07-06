type ProblemStat = number[2];
type ArticleInfo = {
    title: string,
    tags: string[],
    author: string,
    created: string,
    lastCommit: CommitInfo
};
type ArticleData = {
    articleInfo: ArticleInfo,
    rendered: string,
};

type ProblemStatSet = {
    [path: string]: ProblemStat
};

type ArticleSet = {
    [id: string]: ArticleInfo
};
type ProblemArticleSet = {
    translations: ArticleSet,
    solutions: ArticleSet
};
