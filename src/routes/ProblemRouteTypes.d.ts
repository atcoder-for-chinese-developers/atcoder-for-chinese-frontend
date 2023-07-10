type ArticleInfo = {
    title: string,
    tags: string[],
    author: string,
    created: string,
    lastCommit: CommitInfo,
    id: string
};
type ProblemArticleSet = {
    translations: ArticleInfo[],
    solutions: ArticleInfo[]
};
type ProblemRouteData = {
    translations: ArticleInfo[],
    solutions: ArticleInfo[],
}
