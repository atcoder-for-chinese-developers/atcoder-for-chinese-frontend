import { Link, useParams, useRouteLoaderData } from 'react-router-dom';
import { Container, Header, Icon, Segment, Table } from 'semantic-ui-react';
import ProblemDisplayer from '../components/ProblemDisplayer';
import './ProblemPage.css';

import { formatDate } from '../js/formatDate';

function ProblemPage() {
  const params = useParams() as {[id: string]: string};
  const {translations, solutions} = useRouteLoaderData('problem') as ProblemRouteData;
  const {problemSet} = useRouteLoaderData('site') as SiteRouteData;
  const problem = problemSet[params.problem];

  function getArticleTable(articles: ArticleInfo[], type: string) {
    if (Object.keys(articles).length === 0) {
      return (
        <Segment placeholder attached>
          <Header icon>
            <Icon name='hdd outline' />
            没有内容
          </Header>
        </Segment>
      );
    }
    let elementList = [];
    for (let article of articles) {
      elementList.push(
        <Table.Row key={ article.id }>
          <Table.Cell><Link to={ `/${params.site}/p/${params.problem}/${type}/${article.id}` }>{ article.title }</Link></Table.Cell>
          <Table.Cell>{ article.author || "" }</Table.Cell>
          <Table.Cell>{ formatDate(article.created) }</Table.Cell>
          <Table.Cell>{  formatDate(article.lastCommit.date) }</Table.Cell>
        </Table.Row>
      );
    }
    return (
      <Segment attached>
        <Table singleLine fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>标题</Table.HeaderCell>
              <Table.HeaderCell>作者</Table.HeaderCell>
              <Table.HeaderCell>创建日期</Table.HeaderCell>
              <Table.HeaderCell>上次更新</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { elementList }
          </Table.Body>
        </Table>
      </Segment>
    );
  }


  return (
    <div className='ProblemPage'>
      <Container>
        <Header as="h1">
          <ProblemDisplayer large problem={problem} external={ true } link={problem.link || undefined} index={problem.id}/>
        </Header>
        <Header as='h2' attached='top' block size='medium'>
          翻译
        </Header>
        { getArticleTable(translations, 't') }
        <Header as='h2' attached='top' block size='medium'>
          题解
        </Header>
        { getArticleTable(solutions, 's') }
      </Container>
    </div>
  )
}

export default ProblemPage;
