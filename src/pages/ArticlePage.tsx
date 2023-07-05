import { useParams, useRouteLoaderData } from "react-router-dom";
import Article from "../components/Article";
import './ArticlePage.css';

function ArticlePage() {
  const params = useParams() as {[id: string]: string};
  const {siteData, problemStats} = useRouteLoaderData('site') as {siteData: SiteData, problemStats: ProblemStatSet};
  const {article} = useRouteLoaderData('article') as {article: ArticleData};
  
  const problem = siteData.contests[params.contest].problems[params.problem];

  return (
    <div className='ArticlePage'>
      <Article
        article={ article }
        problem={ problem }
        stats={problemStats[`${params.contest}/${params.problem}`]  || [0, 0]}
      />
    </div>
  )
}

export default ArticlePage;
