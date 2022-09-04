import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from './constants/router';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';
import 'moment/locale/vi';
import './App.css';
import * as MODE from './constants/mode'
import { isMode } from './utils/check';
moment.locale('vi');

function App() {
  const [isLoading, setLoading] = useState(true);
  const [direction, setDirection] = useState('ltr');
  const [componentSize, setComponentSize] = useState('large');
  const [cartData, setCartData] = useState()
  const [billData, setBillData] = useState()
  const [currentUser, setCurrentUSer] = useState()

  useEffect(() => {
    setCurrentUSer(JSON.parse(window.localStorage.getItem("USM_USER")))
    setCartData(JSON.parse(window.localStorage.getItem("USM_CART")))
    if(isMode([MODE.TEST])) {
      setBillData(JSON.parse(window.localStorage.getItem("USM_BILL")))
    }
  }, [])

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
          const Header = page?.element?.header
          const Body = page?.element?.component
          const Role = page?.element?.role
          return <Route path={page.url} key={key} element={
            <ConfigProvider 
              locale={viVN}
              direction={direction}
              componentSize={componentSize}
            >
              <Layout 
                Header={<Header CartData={[cartData, setCartData]} CurrentUser={[currentUser, setCurrentUSer]}/>}
                Component={<Body CartData={[cartData, setCartData]} CurrentUser={[currentUser, setCurrentUSer]} BillData={[billData, setBillData]}/>} 
                Role={Role} 
                Direction={[direction, setDirection]}
                ComponentSize={[componentSize, setComponentSize]}
                CartData={[cartData, setCartData]}
                CurrentUser={[currentUser, setCurrentUSer]}
              />
            </ConfigProvider>
          }/> 
        })
      }
    </Routes>
  );
}

export default App;