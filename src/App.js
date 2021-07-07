import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import "./App.css";
import Square from "./Square";
import { generateAndDownloadBlob } from "./utils";

function App() {
  const [numberOfSquares, setNumberOfSquares] = useState(5);
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    let squares = [];
    for (let i = 0; i < numberOfSquares; i++) {
      squares.push(<Square i={i} />);
    }
    setGrid(squares);
  }, [numberOfSquares]);

  const changeNumber = (e) => {
    const UPPER_LIMIT = 10000;
    const LOWER_LIMIT = 0;
    if (e.target.value <= UPPER_LIMIT && e.target.value >= LOWER_LIMIT)
      setNumberOfSquares(e.target.value);
  };

  return (
    <div className='app'>
      <input
        onChange={changeNumber}
        value={numberOfSquares}
        type='number'
        placeholder='Number of elements...'
      />
      <div className='header'>
        <div>
          <div>GRAPH</div>
          <div>For {numberOfSquares} elements</div>
          <button
            type='button'
            onClick={() => {
              domtoimage
                .toBlob(document.getElementById("grid"))
                .then(generateAndDownloadBlob)
                .catch((err) => console.log(err));
            }}
          >
            DOWNLOAD
          </button>
        </div>
      </div>
      <div id='grid' className='grid'>
        {grid}
      </div>
    </div>
  );
}

export default App;
