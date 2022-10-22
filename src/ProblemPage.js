import { useParams } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';
import ProblemDisplayer from './ProblemDisplayer';
import './ProblemPage.css';

function ProblemPage(props) {
  const params = useParams();
  
  const contest = params.contest;
  const problem = params.problem;
  
  let data = {};
  for (const key in props.data.contests) Object.assign(data, props.data.contests[key]);

  return (
    <>
      <Container>
        <Header as="h1">
          <ProblemDisplayer problem={ data[contest].problems[problem] }/>
        </Header>
      </Container>
    </>
  )
}

export default ProblemPage;
