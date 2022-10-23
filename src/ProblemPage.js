import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';
import './ProblemPage.css';

function ProblemPage(props) {
  const params = useParams();
  
  function getData() {
    let contest = params.contest;
    let problem = params.problem;
    for (let key in props.data.contests) {
      if (props.data.contests[key].hasOwnProperty(contest)) {
        return props.data.contests[key][contest].problems[problem];
      }
    }
    return {};
  }

  let data = getData();

  useEffect(() => {
    document.title = `${ data.title } - AtCoder for Chinese`;
  });

  return (
    <div className='ProblemPage'>
      <Container>
        <Header as="h1">
          <ProblemDisplayer large problem={ data }/>
        </Header>
      </Container>
    </div>
  )
}

export default ProblemPage;
