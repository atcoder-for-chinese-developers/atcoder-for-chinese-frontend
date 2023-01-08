import { useParams } from "react-router-dom";
import Article from "../components/Article";
import { getProblemData } from "../js/util";
import './ArticlePage.css';
import { useEffect } from "react";

interface ArticlePageProps {
  data: GlobalData,
  type: 'translations' | 'solutions',
  setActiveNavItem: React.Dispatch<React.SetStateAction<string | null>>
};

function ArticlePage(props: ArticlePageProps) {
  const param = useParams();
  
  const problem = getProblemData(param, props.data) as Problem;
  const article = problem[props.type][param.id as string];

  useEffect(() => {
    document.title = `${ article.title } - ${ problem.title } - AtCoder for Chinese`;
    props.setActiveNavItem(null);
  });

  return (
    <div className='ArticlePage'>
      <Article path={ `/${ props.type }/${ param.contest }.${ param.problem }.${ param.id }.html` } article={ article } problem={ problem } type={ props.type }/>
    </div>
  )
}

export default ArticlePage;
