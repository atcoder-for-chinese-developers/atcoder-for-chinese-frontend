import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Header, Icon, Segment, Table } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';
import './ProblemPage.css';

import dayjs from 'dayjs';

function ProblemPage(props) {
  const params = useParams();
  
  function getProblemData() {
    let contest = params.contest;
    let problem = params.problem;
    for (let key in props.data.contests) {
      if (props.data.contests[key].hasOwnProperty(contest)) {
        return props.data.contests[key][contest].problems[problem];
      }
    }
    return {};
  }

  let problem = getProblemData();
  let translations = (props.data.translations.data[params.contest] || {})[params.problem] || {};
  let solutions = (props.data.solutions.data[params.contest] || {})[params.problem] || {};

  function formatDate(date) {
    if ((date || '') === '') return '';
    return dayjs(new Date(date)).format('YYYY 年 MM 月 DD 日 hh:mm');
  }

  function getArticleTable(articles, type) {
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

  useEffect(() => {
    document.title = `${ problem.title } - AtCoder for Chinese`;
  });

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
