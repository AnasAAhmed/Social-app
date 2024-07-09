import React from 'react';

const Blocked = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg">You have been blocked by this user.</p>
    </div>
  );
}

export default Blocked;
