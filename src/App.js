import './App.css';

import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({ ready: 0 });

  async function loadData() {
    let contestsRes = await fetch("/data.json");
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

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home data={data}/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
