import React from 'react';
import DeliverState from './context/deliver/DeliverState';
import UserList from './components/UserList';

function App() {
  return (
    <DeliverState>
      <div className="w-full h-screen">
        <UserList />
      </div>
    </DeliverState>
  );
}

export default App;
