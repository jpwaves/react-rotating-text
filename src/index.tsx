import React from 'react';
import ReactDOM from 'react-dom/client';
import RotatingText from './RotatingText';

const words = ['a', 'b', 'c', 'd', 'e'];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RotatingText words={words} />);
