import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Page } from './constants/router';

function App() {
    const [isLoading, setLoading] = useState(true);
  
    function fakeRequest() {
      return new Promise(resolve => setTimeout(() => resolve(), 2000));
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
                    return <Route path={page.url} key={key} element={page.element}/> 
                })
            }
        </Routes>
    );
}

export default App;