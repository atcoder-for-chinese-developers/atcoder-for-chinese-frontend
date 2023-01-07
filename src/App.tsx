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

  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

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
    content = <Loader active inline='centered' size='big' className='Loader'>正在加载</Loader>;
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
