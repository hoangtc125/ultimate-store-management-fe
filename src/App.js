import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Page } from './constants/router';
import moment from 'moment';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [time, setTime] = useState()

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
    const timeInterval = setInterval(() => {
      setTime('Thứ ' + (parseInt(moment().format('d')) + 1) + ', tuần thứ ' + moment().format('w') + ', ' +  moment().format('DD/MM/YYYY - hh:mm:ss'))
    }, 1000);

    return () => {
      clearInterval(timeInterval)
    }
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
          return <Route path={page.url} key={key} element={<Layout Component={<Body />} Role={Role} Time={time}/>}/> 
        })
      }
    </Routes>
  );
}

export default App;