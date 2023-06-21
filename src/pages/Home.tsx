import { useParams } from 'react-router-dom';
import './Home.css';

import ContestList from '../components/ContestList';

import { Container } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useGA } from '../js/useGA';

interface HomeProps {
  data: GlobalData,
  setActiveNavItem: React.Dispatch<React.SetStateAction<string | null>>
}

function Home(props: HomeProps) {
  const params = useParams();
  useGA();

  const tab = params.hasOwnProperty('tab') ? (params.tab as string) : 'abc';

  useEffect(() => {
    let tab = params.hasOwnProperty('tab') ? params.tab : 'abc';
    let title = '';
    if (tab === 'abc') title = 'AtCoder Beginner Contest';
    else if (tab === 'arc') title = 'AtCoder Regular Contest';
    else if (tab === 'agc') title = 'AtCoder Grand Contest';
    else if (tab === 'ahc') title = 'AtCoder Heuristic Contest';
    else title = '其它比赛';
    document.title = `${ title } - AtCoder for Chinese`;
    props.setActiveNavItem(tab || null);
  });

  return (
    <div className="Home">
      <Container>
        <ContestList data={ props.data.contests[tab] || {} }></ContestList>
      </Container>
    </div>
  );
}

export default Home;
