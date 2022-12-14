import './App.css';
import 'nprogress/nprogress.css';

import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import nProgress from 'nprogress';
import Nav from './components/Nav';
import Footer from './components/Footer';

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
    },
    solutions: {
      lastCommit: {
        id: '',
        short: '',
        date: ''
      },
    },
    ready: false
  });

  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  async function loadData() {
    let contestsRes = await fetch(`${ process.env.REACT_APP_SPIDERS_PATH }/data.json`);
    let translationsRes = await fetch(`${ process.env.REACT_APP_TRANSLATIONS_PATH }/list.json`);
    let solutionsRes = await fetch(`${ process.env.REACT_APP_SOLUTIONS_PATH }/list.json`);
    let contests = await contestsRes.json();
    let translations = await translationsRes.json();
    let solutions = await solutionsRes.json();
    for (const type in contests) { 
      for (const contestID in contests[type]) {
        for (const problemID in contests[type][contestID].problems) {
          if (translations.data[contestID]) {
            if (translations.data[contestID][problemID]) {
              contests[type][contestID].problems[problemID].translations = JSON.parse(JSON.stringify(translations.data[contestID][problemID]));
            } else contests[type][contestID].problems[problemID].translations = {};
          } else contests[type][contestID].problems[problemID].translations = {};
          if (solutions.data[contestID]) {
            if (solutions.data[contestID][problemID]) {
              contests[type][contestID].problems[problemID].solutions = JSON.parse(JSON.stringify(solutions.data[contestID][problemID]));
            } else contests[type][contestID].problems[problemID].solutions = {};
          } else contests[type][contestID].problems[problemID].solutions = {};
        }
      }
    }
    delete translations.data;
    delete solutions.data;
    return {
      contests: contests,
      translations: translations,
      solutions: solutions,
      ready: true
    }
  }

  useEffect(() => {
    if (!data.ready) document.title = `???????????? - AtCoder for Chinese`;
  })

  if (!data.ready) {
    loadData()
      .then(data => {
        setData(data)
      })
      .catch(e => console.log(e));
  }

  let content;

  const pageProps = {
    data: data,
    setActiveNavItem: setActiveNavItem
  };

  if (data.ready) {
    content = (
      <Suspense fallback={<NProgress/>}>
        <Routes>
          <Route path="/" element={<Home {...pageProps}/>} />
          <Route path="/problem/:contest/:problem" element={<ProblemPage {...pageProps}/>}/>
          <Route path="/translation/:contest/:problem/:id" element={<ArticlePage {...pageProps} type='translations'/>}/>
          <Route path="/solution/:contest/:problem/:id" element={<ArticlePage {...pageProps} type='solutions'/>}/>
          <Route path="/:tab" element={<Home {...pageProps}/>} />
        </Routes>
      </Suspense>
    );
  } else {
    content = <Loader active inline='centered' size='big' className='Loader'>????????????</Loader>;
  }

  return (
    <div className="App">
      <HashRouter>
        <Nav activeItem={ activeNavItem }/>
        { content }
        <Footer data={ data }/>
      </HashRouter>
    </div>
  );
}

export default App;
