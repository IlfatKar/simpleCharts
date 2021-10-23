import React from 'react';
import './App.css';
import VerticalChart from "./components/VerticalChart";
import HorizontalChart from "./components/HorizontalChart";

function App() {
  return (
    <div className="App">
      <HorizontalChart
        data={{
          title: 'autumn',
          values: [
            {title: 'JS', value: 100, color: '#fca'},
            {title: 'PHP', value: 64}, {title: 'PHP', value: 1},
            {title: 'PHP', value: 84}, {title: 'PHP', value: 11}
          ]
        }}
        style={{gap: 10, defaultColor: '#aaf'}}
      />
    </div>
  );
}

export default App;
