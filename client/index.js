import React from 'react';
import ReactDOM from 'react-dom';
import GTable from './components/g-table/index.jsx';

function App() {
  return <GTable />;
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('react-container'));
