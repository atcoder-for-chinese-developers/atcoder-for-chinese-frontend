import { useParams } from 'react-router-dom';
import './Home.css';

import ContestList from './ContestList';

import { Container } from 'semantic-ui-react';

function Home(props) {
  const params = useParams();

  const tab = params.hasOwnProperty('tab') ? params.tab : 'abc';

  return (
    <div className="Home">
      <Container>
        { props.data.ready ? <ContestList data={ props.data.contests[tab] || [] }></ContestList> : "Loading..." }
      </Container>
    </div>
  );
}

export default Home;
