import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Page } from './constants/router';

function App() {
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