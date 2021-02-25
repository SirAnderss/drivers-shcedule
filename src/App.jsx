import React from 'react';
import DeliverState from './context/deliver/DeliverState';
import Schedule from './components/Schedule';

function App() {
  return (
    <DeliverState>
      <div className="w-full h-screen">
        <Schedule />
      </div>
    </DeliverState>
  );
}

export default App;
