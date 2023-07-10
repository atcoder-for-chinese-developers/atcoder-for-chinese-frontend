import './ContestList.css';

import { Icon, Pagination, Table } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';
import { useEffect, useState } from 'react';

interface ContestListProps {
  data: Contest[];
  problemSet: Dict<Problem>;
  site: string;
};

function ContestList(props: ContestListProps) {
  const [page, setPage] = useState<number>(1);
  const [elementList, setElementList] = useState<JSX.Element[]>([]);
  const pageStep = 10;

  useEffect(() => {
    const contestList = props.data;
    let elementList = [] as JSX.Element[];
    for (const contestID in contestList) {
      const contest = contestList[contestID];
      let problems = contest.problems;
      let problemElements = [];
      for (const contestProblem of problems) {
        const problemID = contestProblem.id;
        const problem = props.problemSet[problemID];
        problemElements.push(
          <Table.Cell key={ problemID } className='ProblemCell'>
            <ProblemDisplayer problem={problem} link={`/${props.site}/p/${problemID}`} index={contestProblem.index}/>
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
    setElementList(elementList);
  }, [props]);

  const [visibleElements, setVisibleElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let l = (page - 1) * pageStep, r = Math.min(l + pageStep, elementList.length);
    let visibleElements = [] as JSX.Element[];
    for (let i = l; i < r; i++) visibleElements.push(elementList[i]);
    setVisibleElements(visibleElements);
  }, [page, elementList])
  useEffect(() => {
    setPage(1);
  }, [props])
  
  if (!elementList.length) return (<>No Data</>);

  let paginationElement = (
    <div className='pagination-container'>
      <Pagination
        activePage={page}
        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
        prevItem={{ content: <Icon name='angle left' />, icon: true }}
        nextItem={{ content: <Icon name='angle right' />, icon: true }}
        totalPages={Math.ceil(elementList.length / pageStep)}
        onPageChange={(e, { activePage }) => setPage(activePage as number)}
      />
    </div>
  )

  return (
    <div className="ContestList">
      { paginationElement }
      { visibleElements }
      { paginationElement }
    </div>
  );
}

export default ContestList;
