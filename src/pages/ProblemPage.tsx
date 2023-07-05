import { Link, useParams, useRouteLoaderData } from 'react-router-dom';
import { Container, Header, Icon, Segment, Table } from 'semantic-ui-react';
import ProblemDisplayer from '../components/ProblemDisplayer';
import './ProblemPage.css';

import { formatDate } from '../js/formatDate';

function ProblemPage() {
  const params = useParams() as {[id: string]: string};
  const {articles} = useRouteLoaderData('problem') as {articles: ProblemArticleSet};
  const {siteData, problemStats} = useRouteLoaderData('site') as {siteData: SiteData, problemStats: ProblemStatSet};
  const problem = siteData.contests[params.contest].problems[params.problem];

  let translations = articles.translations;
  let solutions = articles.solutions;

  function getArticleTable(articles: ArticleSet, type: string) {
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
    for (let key in articles) {
      elementList.push(
        <Table.Row key={ key }>
          <Table.Cell><Link to={ `/${params.site}/${params.contest}/${params.problem}/${type}/${key}` }>{ articles[key].title }</Link></Table.Cell>
          <Table.Cell>{ articles[key].author || "" }</Table.Cell>
          <Table.Cell>{ formatDate(articles[key].created) }</Table.Cell>
          <Table.Cell>{  formatDate(articles[key].lastCommit.date) }</Table.Cell>
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
          <ProblemDisplayer large problem={ problem } stats={ problemStats[`${params.contest}/${params.problem}`] || [0, 0] } external={ true } link={ problem.link || undefined }/>
        </Header>
        <Header as='h2' attached='top' block size='medium'>
          翻译
        </Header>
        { getArticleTable(translations, 'translations') }
        <Header as='h2' attached='top' block size='medium'>
          题解
        </Header>
        { getArticleTable(solutions, 'solutions') }
      </Container>
    </div>
  )
}

export default ProblemPage;
