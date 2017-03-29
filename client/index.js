import React from 'react';
import ReactDOM from 'react-dom';
import GTable from './components/g-table/index.jsx';

function App() {
  const data = JSON.parse(document.getElementById('table-data').textContent);

  return (
    <GTable data={data} />
  );
}

const reactApp = <App />;

ReactDOM.render(reactApp, document.getElementById('table'));
