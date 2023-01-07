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
  
  const article = props.data[props.type].data[param.contest as string][param.problem as string][param.id as string];
  const problem = getProblemData(param, props.data) as Problem;

  useEffect(() => {
    document.title = `${ article.title } - ${ problem.title } - AtCoder for Chinese`;
    props.setActiveNavItem(null);
  });

  return (
    <div className='ArticlePage'>
      <Article path={ `/${ props.type }/${ param.contest }.${ param.problem }.${ param.id }.html` } article={ article } problem={ problem }/>
    </div>
  )
}

export default ArticlePage;
