import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy,setCopy] = useState(false)
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstiuvxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*`~^-+=_";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
      
    }, 1000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();

    // let pass = "";
    // let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstiuvxyz";

    // if (numAllowed) str += "0123456789";
    // if (charAllowed) str += "!@#$%&*`~^-+=_";

    // for (let i = 0; i < length; i++) {
    //   let char = Math.floor(Math.random() * str.length + 1);
    //   pass += str.charAt(char);
    // }

    // setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-orange-500 bg-gray-700 px-4 py-3 my-8 rounded-lg">
        <h1 className="text-white text-center my-2 font-semibold">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={() => {
              copyPasswordToClipBoard()
            }}
            className={`copyBtn outline-none bg-orange-500 text-white px-3 py-0.5 shrink-0 ${copy ? 'bg-green-500' : 'bg-orange-500'}`}
          >
            {copy ? "Text Copied" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numAllowed"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charAllowed"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
