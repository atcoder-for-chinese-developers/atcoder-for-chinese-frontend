import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Icon, Segment, Table } from 'semantic-ui-react';
import ProblemDisplayer from '../components/ProblemDisplayer';
import './ProblemPage.css';

import { getProblemData } from '../js/util';
import { formatDate } from '../js/formatDate';

interface ProblemPageProps {
  data: GlobalData,
  setActiveNavItem: React.Dispatch<React.SetStateAction<string | null>>
};

function ProblemPage(props: ProblemPageProps) {
  const params = useParams();

  let problem = getProblemData(params, props.data);

  useEffect(() => {
    if (problem) document.title = `${ (problem as Problem).title } - AtCoder for Chinese`;
    props.setActiveNavItem(null);
  });

  if (!problem) return (
    <div className="problemPage">
      <Container>
        <Header as="h1">未找到对应题目</Header>
      </Container>
    </div>
  )

  let translations = problem.translations;
  let solutions = problem.solutions;

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
          <Table.Cell><Link to={ '/' + type + '/' + params.contest + '/' + params.problem + '/' + key }>{ articles[key].title }</Link></Table.Cell>
          <Table.Cell>{ articles[key].author || "" }</Table.Cell>
          <Table.Cell>{ formatDate(articles[key].created) }</Table.Cell>
          <Table.Cell>{ formatDate(articles[key].lastCommit.date) }</Table.Cell>
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
          <ProblemDisplayer large problem={ problem } external={ true } link={ 'https://atcoder.jp/contests/' + params.contest + '/tasks/' + params.problem }/>
        </Header>
        <Header as='h2' attached='top' block size='medium'>
          翻译
        </Header>
        { getArticleTable(translations, 'translation') }
        <Header as='h2' attached='top' block size='medium'>
          题解
        </Header>
        { getArticleTable(solutions, 'solution') }
      </Container>
    </div>
  )
}

export default ProblemPage;
