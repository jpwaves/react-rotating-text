import React from 'react';
import ReactDOM from 'react-dom/client';
import RotatingText from './RotatingText';

const WORDS = ['Milet', 'Eve', 'RADWIMPS', 'Goose House', 'Yorushika', 'Ado'];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RotatingText words={WORDS} />);
