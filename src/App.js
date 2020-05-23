import React, {useState} from 'react';

// Flower IDs start from 0 and are monotonically increasing up to this number.
const HIGHEST_FLOWER_ID = 53;

function App() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Flowers: {count}
      <img src={`images/flowers/${count}.png`} />
    </button>
  );
}

export default App;
