import { useParams, useRouteLoaderData } from "react-router-dom";
import Article from "../components/Article";
import './ArticlePage.css';

function ArticlePage() {
  const params = useParams() as {[id: string]: string};
  const {problemSet} = useRouteLoaderData('site') as SiteRouteData;
  const {title, tags, author, created, lastCommit, rendered} = useRouteLoaderData('article') as ArticleRouterData;
  
  const problem = problemSet[params.problem];

  return (
    <div className='ArticlePage'>
      <Article
        title={title}
        tags={tags || []}
        author={author}
        created={created}
        lastCommit={lastCommit}
        rendered={rendered}
        problem={ problem }
      />
    </div>
  )
}

export default ArticlePage;
