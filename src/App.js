import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Page } from './constants/router';

function App() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 100));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(l => !l);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      {
        Page.map((page, key) => {
          const Layout = page?.element?.layout
          const Body = page?.element?.component
          const Role = page?.element?.role
          return <Route path={page.url} key={key} element={<Layout Component={<Body />} Role={Role}/>}/> 
        })
      }
    </Routes>
  );
}

export default App;