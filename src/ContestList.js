import './ContestList.css';

import { Table } from 'semantic-ui-react';

function ContestList(props) {
  function getDifficultyClass(difficulty) {
    if (difficulty === null) return 'Black';
    if (difficulty < 400) return 'Grey';
    if (difficulty < 800) return 'Brown';
    if (difficulty < 1200) return 'Green';
    if (difficulty < 1600) return 'Cyan';
    if (difficulty < 2000) return 'Blue';
    if (difficulty < 2400) return 'Yellow';
    if (difficulty < 2800) return 'Orange';
    return 'Red';
  }
  function getDifficultyColor(difficulty) {
    if (difficulty === null) return 'rgb(0, 0, 0)';
    if (difficulty < 400) return 'rgb(128, 128, 128)';
    if (difficulty < 800) return 'rgb(128, 64, 0)';
    if (difficulty < 1200) return 'rgb(0, 128, 0)';
    if (difficulty < 1600) return 'rgb(0, 192, 192)';
    if (difficulty < 2000) return 'rgb(0, 0, 255)';
    if (difficulty < 2400) return 'rgb(192, 192, 0)';
    if (difficulty < 2800) return 'rgb(255, 128, 0)';
    if (difficulty < 3200) return 'rgb(255, 0, 0)';
    if (difficulty < 3600) return 'rgb(150, 92, 44)';
    if (difficulty < 4000) return 'rgb(128, 128, 128)';
    return 'rgb(255, 215, 0)';
  }
  function getDifficultyRate(difficulty) {
    if (difficulty === null) return '100%';
    if (difficulty >= 3200) return '100%';
    return ((difficulty % 400) / 4) + '%';
  }
  function getDifficultyDisplayerStyle(difficulty) {
    let ret = {};
    ret.borderColor = getDifficultyColor(difficulty);
    if (difficulty === null) ret.background = 'linear-gradient(to top, rgb(0, 0, 0) 100%, rgba(0, 0, 0, 0) 100%) border-box';
    else if (difficulty >= 3200) ret.background = 'linear-gradient(to right, ' + getDifficultyColor(difficulty) + ', white, ' + getDifficultyColor(difficulty) + ')';
    else {
      ret.background = 'linear-gradient(to top, ' + getDifficultyColor(difficulty) + ' ' + getDifficultyRate(difficulty) + ', rgba(0, 0, 0, 0) ' + getDifficultyRate(difficulty) + ') border-box';
    }
    return ret;
  }

  const contestList = props.data;
  let elementList = [];
  contestList.forEach(contest => {
    let problems = contest.problems;
    let problemElements = [];
    problems.forEach(problem => {
      problemElements.push(
        <Table.Cell key={ problem.id } className={ 'ProblemCell Difficulty' + getDifficultyClass(problem.difficulty) } title={ problem.difficulty !== null ? '(*' + problem.difficulty + ') ' + problem.title : problem.title }>
          <span className='DifficultyDisplayer' style={ getDifficultyDisplayerStyle(problem.difficulty) }></span>
          { problem.title }
        </Table.Cell>
      )
    })
    elementList.push(
      <Table celled fixed singleLine key={ contest.id }>
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
