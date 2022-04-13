import * as React from 'react'
import { useEffect } from 'react';

const App = () => {

  const event = () => {
    const IsShow: boolean = true
    console.log('IsShow', IsShow);
    console.log('1111');
  }

  useEffect(() => {

    event()
  }, [])


  return (
    <div className="App">
      <h1>12313</h1>
      <h1>12313</h1>
                 <h1>12313</h1>
      <h1>12313</h1>
      <h1>12313</h1>
    </div>
  );
}

export default App;
