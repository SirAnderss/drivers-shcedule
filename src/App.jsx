import React from 'react';
import DeliverState from './context/deliver/DeliverState';
import Schedule from './components/Schedule';

function App() {
  return (
    <DeliverState>
      <Schedule />
    </DeliverState>
  );
}

export default App;
