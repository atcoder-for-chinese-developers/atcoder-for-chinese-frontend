import './App.css';

import { useEffect, useRef, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Loader, Sticky } from 'semantic-ui-react';

import Home from './Home';
import Nav from './Nav';
import ProblemPage from './ProblemPage';
import { GlobalData } from './types';

function App() {
  const [data, setData] = useState<GlobalData>({
    contests: {},
    translations: {
      lastCommit: {
        id: '',
        short: '',
        date: ''
      },
      data: {}
    },
    solutions: {
      lastCommit: {
        id: '',
        short: '',
        date: ''
      },
      data: {}
    },
    ready: false
  });

  const contextRef = useRef<HTMLDivElement | null>(null);

  async function loadData() {
    let contestsRes = await fetch("/spiders/data.json");
    let translationsRes = await fetch("/translations/list.json");
    let solutionsRes = await fetch("/solutions/list.json");
    let contests = await contestsRes.json();
    let translations = await translationsRes.json();
    let solutions = await solutionsRes.json();
    return {
      contests: contests,
      translations: translations,
      solutions: solutions,
      ready: true
    }
  }

  useEffect(() => {
    if (!data.ready) document.title = `正在加载 - AtCoder for Chinese`;
  })

  if (!data.ready) {
    loadData()
      .then(data => {
        setData(data)
      })
      .catch(e => console.log(e));
  }

  let content;

  if (data.ready) {
    content = (
      <Routes>
        <Route path="/" element={<Home data={data}/>} />
        <Route path="/problem/:contest/:problem" element={<ProblemPage data={data}/>}/>
        <Route path="/:tab" element={<Home data={data}/>} />
      </Routes>
    );
  } else {
    content = <Loader active inline='centered' size='big' className='Loader'>正在加载</Loader>;
  }

  return (
    <div className="App" ref={contextRef}>
      <HashRouter>
        <Sticky context={contextRef}><Nav /></Sticky>
        { content }
      </HashRouter>
    </div>
  );
}

export default App;
