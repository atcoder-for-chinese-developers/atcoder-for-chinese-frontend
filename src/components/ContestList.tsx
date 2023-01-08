import './ContestList.css';

import { Table } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';

interface ContestListProps {
  data: ContestSet;
};

function ContestList(props: ContestListProps) {
  const contestList = props.data;
  let elementList = [];
  for (const contestID in contestList) {
    const contest = contestList[contestID];
    let problems = contest.problems;
    let problemElements = [];
    for (const problemID in problems) {
      const problem = problems[problemID];
      problemElements.push(
        <Table.Cell key={ problem.id } className='ProblemCell'>
          <ProblemDisplayer problem={ problem } link={ '/problem/' + contestID + '/' + problemID }/>
        </Table.Cell>
      )
    }
    elementList.push(
      <Table celled fixed singleLine key={ contestID }>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={ problemElements.length > 0 ? problemElements.length : 1 }>
              <a rel="noreferrer" href={ 'https://atcoder.jp/contests/' + contestID } target="_blank">{ contest.title }</a>
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
  }
  elementList = elementList.reverse();
  return (
    <div className="ContestList">
      { elementList }
    </div>
  );
}

export default ContestList;
