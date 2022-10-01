import './ContestList.css';

import { Table } from 'semantic-ui-react';

function ContestList(props) {
  const contestList = props.data;
  let elementList = [];
  contestList.forEach(contest => {
    let problems = contest.problems;
    let problemElements = [];
    problems.forEach(problem => {
      problemElements.push(
        <Table.Cell key = { problem.id } className='ProblemCell'>
          { problem.title }
        </Table.Cell>
      )
    })
    elementList.push(
      <Table celled columns={ problems.length > 0 ? problems.length : 1 } key={ contest.id }>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={ problems.length > 0 ? problems.length : 1 }>
              <a rel="noreferrer" href={ 'https://atcoder.jp/contests/' + contest.id } target="_blank">{ contest.title }</a>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            { problemElements }
          </Table.Row>
        </Table.Body>
      </Table>
    )
  });
  elementList = elementList.reverse();
  return (
    <div className="ContestList">
      { elementList }
    </div>
  );
}

export default ContestList;
