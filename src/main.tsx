
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { router } from './router';

// Wait for the router to be ready before rendering
void router.load();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
