import './App.css';
import 'nprogress/nprogress.css';

import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import nProgress from 'nprogress';
import Nav from './components/Nav';

const Home = lazy(() => import('./pages/Home'));
const ProblemPage = lazy(() => import('./pages/ProblemPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));

function NProgress(props: {}) {
  useEffect(() => {
    nProgress.start();
    return () => { nProgress.done(); }
  })
  return <Fragment/>
}

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
      <Suspense fallback={<NProgress/>}>
        <Routes>
          <Route path="/" element={<Home data={data}/>} />
          <Route path="/problem/:contest/:problem" element={<ProblemPage data={data}/>}/>
          <Route path="/translation/:contest/:problem/:id" element={<ArticlePage data={data} type='translations'/>}/>
          <Route path="/solution/:contest/:problem/:id" element={<ArticlePage data={data} type='solutions'/>}/>
          <Route path="/:tab" element={<Home data={data}/>} />
        </Routes>
      </Suspense>
    );
  } else {
    content = <Loader active inline='centered' size='big' className='Loader'>正在加载</Loader>;
  }

  return (
    <div className="App">
      <HashRouter>
        <Nav />
        { content }
      </HashRouter>
    </div>
  );
}

export default App;
