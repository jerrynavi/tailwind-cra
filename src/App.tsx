import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mx-auto max-w-3xl p-4 shadow-lg rounded">
        <div className="text-center">

          <img src={logo} alt="Logo" className="h-32 my-4 mx-auto" />

          <div className="text-gray-500 text-2xl font-bold">
            <h1>
              Welcome to Tailwind!
            </h1>
          </div>

          <div className="my-4">
            <p>
              Learn more by <a href="https://tailwindcss.com/docs/utility-first" className="text-blue-400">visiting the docs.</a>
            </p>
            <p>
              Cheers! 
              <span role="img" aria-labelledby="cheers emoji">
                🎊
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
