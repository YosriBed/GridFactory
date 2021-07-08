import React, { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";

import { drawGraph, clearGraph, generateSquare } from "./draw";
import { generateAndDownloadBlob } from "./utils";

const App = () => {
  const [numberOfSquares, setNumberOfSquares] = useState(5);

  const graphRef = useRef();

  useEffect(() => {
    let squares = [];
    for (let i = 0; i < numberOfSquares; i++) {
      squares.push(generateSquare(i));
    }
    if (graphRef.current) {
      clearGraph(graphRef.current);
      drawGraph(squares, graphRef.current);
    }
  }, [numberOfSquares]);

  const changeNumber = (e) => {
    const UPPER_LIMIT = 10000;
    const LOWER_LIMIT = 0;
    if (e.target.value <= UPPER_LIMIT && e.target.value >= LOWER_LIMIT) {
      setNumberOfSquares(e.target.value);
    }
  };

  return (
    <div className='app'>
      <input
        onChange={changeNumber}
        value={numberOfSquares}
        type='number'
        placeholder='Number of elements...'
      />
      <button
        type='button'
        onClick={() => {
          React.findDOMNode(graphRef).reset();
        }}
      >
        Clear
      </button>
      <button
        type='button'
        onClick={() => {
          domtoimage
            .toBlob(graphRef.current)
            .then(generateAndDownloadBlob)
            .catch(console.log);
        }}
      >
        DOWNLOAD
      </button>
      <div className='header'>
        <div>
          <div>GRAPH</div>
          <div>For {numberOfSquares} elements</div>
        </div>
      </div>
      <div>
        <div id='grid' className='grid' ref={graphRef} />
      </div>
    </div>
  );
};

export default App;
