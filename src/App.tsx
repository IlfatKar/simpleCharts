import React from 'react';
import './App.css';
import VerticalChart from "./components/VerticalChart";
import HorizontalChart from "./components/HorizontalChart";
import CurvedChart from "./components/CurvedChart";

function App() {
  return (
    <div className="App">
      {/*<HorizontalChart*/}
      {/*  data={{*/}
      {/*    title: 'autumn',*/}
      {/*    values: [*/}
      {/*      {title: 'Title1', value: 100, color: '#fca'},*/}
      {/*      {title: 'Title2', value: 64}, {title: 'CHOCHO', value: 1},*/}
      {/*      {title: 'Text3', value: 84}, {title: 'PRIVET', value: 11}*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*  style={{gap: 10, defaultColor: '#aaf'}}*/}
      {/*/>*/}
      {/*<VerticalChart*/}
      {/*  data={{*/}
      {/*    title: 'autumn',*/}
      {/*    values: [*/}
      {/*      {title: 'Title1', value: 100, color: '#fca'},*/}
      {/*      {title: 'Title2', value: 64}, {title: 'CHOCHO', value: 1},*/}
      {/*      {title: 'Text3', value: 84}, {title: 'PRIVET', value: 11}*/}
      {/*    ]*/}
      {/*  }}*/}
      {/*  style={{gap: 10, defaultColor: '#aaf'}}*/}
      {/*/>*/}
      <CurvedChart
        data={{
          title: 'autumn',
          values: [
            {title: 'Title1', value: [50, 100, 150, 200, 550, 200, 150, 100, 50], color: 'red'},
            {title: 'Title2', value: [64, 100, 124], color: '#000'},
            {title: 'Title2', value: [10, 20, 30, 40, 50, 60]},
          ]
        }}
        style={{defaultColor: '#aaf'}}
        valTitles={['jan', 'feb', 'march', 'april', 'may', 'june', 'jule', 'august', 'september']}
      />
    </div>
  );
}

export default App;
