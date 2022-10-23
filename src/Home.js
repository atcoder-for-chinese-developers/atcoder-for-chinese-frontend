import { useParams } from 'react-router-dom';
import './Home.css';

import ContestList from './ContestList';

import { Container } from 'semantic-ui-react';
import { useEffect } from 'react';

function Home(props) {
  const params = useParams();

  const tab = params.hasOwnProperty('tab') ? params.tab : 'abc';

  useEffect(() => {
    let tab = params.hasOwnProperty('tab') ? params.tab : 'abc';
    let title = '';
    if (tab === 'abc') title = 'AtCoder Beginner Contest';
    else if (tab === 'arc') title = 'AtCoder Regular Contest';
    else if (tab === 'agc') title = 'AtCoder Grand Contest';
    else if (tab === 'ahc') title = 'AtCoder Heuristic Contest';
    else title = '其它比赛';
    document.title = `${ title } - AtCoder for Chinese`;
  })

  return (
    <div className="Home">
      <Container>
        <ContestList data={ props.data.contests[tab] || {} }></ContestList>
      </Container>
    </div>
  );
}

export default Home;
