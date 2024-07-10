import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskList from '../src/components/TaskList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<TaskList />
  </React.StrictMode>
);


reportWebVitals();
