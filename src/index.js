import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const App = () => {
  const [id, setId] = useState(1);
  const [meme, setMeme] = useState({});

  const getNextMeme = () => {
    setMeme({});
    setId(id + 1);
  };

  useEffect(() => {
    fetch(`https://meme-api.herokuapp.com/gimme/${id}`)
      .then(res => res.json())
      .then(data => {
        setMeme(data.memes[0]);
      })
      .catch(e => console.log(e));
  }, [id]);

  return (
    <React.Fragment>
      <div className="container text-center">
        <p>MEME - {id}</p>
        <button className="btn btn-primary btn-lg pb-1" onClick={getNextMeme}>
          Generate Next
        </button>
        {meme.title ? (
          <img
            src="..."
            className="img-fluid"
            src={meme.url}
            alt={meme.title}
            alt="Responsive image"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </React.Fragment>
  );
};

render(<App />, document.getElementById("root"));
