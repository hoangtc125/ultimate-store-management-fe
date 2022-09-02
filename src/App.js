import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from './constants/router';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import './App.css';
moment.locale('vi');

function App() {
  const [isLoading, setLoading] = useState(true);
  const [direction, setDirection] = useState('ltr');
  const [componentSize, setComponentSize] = useState('large');

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
          return <Route path={page.url} key={key} element={
            <ConfigProvider 
              locale={viVN}
              direction={direction}
              componentSize={componentSize}
            >
              <Layout 
                Component={<Body />} 
                Role={Role} 
                Direction={[direction, setDirection]}
                ComponentSize={[componentSize, setComponentSize]}
              />
            </ConfigProvider>
          }/> 
        })
      }
    </Routes>
  );
}

export default App;