import './App.css';

import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import { useRef, useState } from 'react';
import Nav from './Nav';
import { Loader, Sticky } from 'semantic-ui-react';

function App() {
  const [data, setData] = useState({ ready: 0 });

  const contextRef = useRef();

  async function loadData() {
    let contestsRes = await fetch("./data.json");
    let contests = await contestsRes.json();
    return {
      contests: contests,
      ready: 1
    }
  }

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
        <Route exact path="/" element={<Home data={data}/>} />
        <Route exact path="/:tab" element={<Home data={data}/>} />
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
