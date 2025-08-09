import { useCallback, useState, useEffect } from 'react';

function App() {
  let [password, setPassword] = useState("lucky");
  let [range, setRange] = useState(8);
  let [num, setNum] = useState(false);
  let [schar, setschar] = useState(false);
  let [copy, setCopy] = useState("Copy");

  const numCheck = useCallback((e) => {
    setNum(e.target.checked);
    console.log(e.target.checked);
  }, []);
  
  const scharCheck = useCallback((e) => {
    setschar(e.target.checked);
    console.log(e.target.checked);
  }, []);

  const passGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let spc = "!@#$%^&*()_+[]{}|;:,.<>?/~";
    let number = "123456789";

    if (num) str += number;
    if (schar) str += spc;

    let pass = "";
    for (let i = 1; i <= range; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [range, num, schar]);

  const copytoclickboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopy("Copied");
  }, [password]);

  const generate = () => {
    passGenerator();
    setCopy("Copy");
  };

  useEffect(() => {
    passGenerator();
  }, [range, num, schar]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4'>
      <div className='w-full max-w-md bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl border border-gray-700'>
        <h1 className='text-xl sm:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6'>
          Password Generator
        </h1>

        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4'>
          <input 
            value={password} 
            className='flex-1 bg-gray-700 text-white rounded-md sm:rounded-l-md px-3 py-2 border border-gray-600 outline-none text-sm sm:text-base' 
            readOnly 
            type="text" 
          />
          <button 
            onClick={copytoclickboard} 
            className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-md sm:rounded-r-md border border-gray-600 text-sm sm:text-base'
          >
            {copy}
          </button>
        </div>

        <div className='mb-4 text-white'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2'>
            <input 
              onChange={(e) => setRange(parseInt(e.target.value))} 
              className='w-full sm:w-2/3 accent-pink-500' 
              min={8} 
              max={50} 
              type="range" 
              value={range}
            />
            <span className='text-sm font-medium'>Length: {range}</span>
          </div>

          <div className='flex items-center gap-2 mb-2'>
            <input 
              type="checkbox" 
              className='h-4 w-4 accent-green-500' 
              onChange={numCheck} 
              checked={num}
            />
            <label className='text-sm'>Number</label>
          </div>

          <div className='flex items-center gap-2'>
            <input 
              type="checkbox" 
              className='h-4 w-4 accent-yellow-500' 
              onChange={scharCheck} 
              checked={schar}
            />
            <label className='text-sm'>Spc character</label>
          </div>
        </div>

        <button 
          onClick={generate} 
          className='w-full mt-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg border border-gray-700 shadow-md text-sm sm:text-base'
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default App;

