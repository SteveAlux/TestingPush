import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


console.log(process.env.REACT_APP_API_KEY)
ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, 
document.getElementById('root'));
