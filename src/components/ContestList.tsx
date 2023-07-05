import './ContestList.css';

import { Table } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';

interface ContestListProps {
  data: ContestSet;
  problemStats: ProblemStatSet;
  site: string;
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
      const problemPath = `${contestID}/${problemID}`;
      problemElements.push(
        <Table.Cell key={ problemID } className='ProblemCell'>
          <ProblemDisplayer problem={ problem } stats={props.problemStats[problemPath] || [0, 0]} link={ '/' + props.site + '/' + contestID + '/' + problemID }/>
        </Table.Cell>
      )
    }
    elementList.push(
      <Table celled fixed singleLine key={ contestID }>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={ problemElements.length > 0 ? problemElements.length : 1 }>
              {
                contest.link ?
                  <a rel="noreferrer" href={ contest.link } target="_blank">{ contest.title }</a>
                : <span>{ contest.title }</span>
              }
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
