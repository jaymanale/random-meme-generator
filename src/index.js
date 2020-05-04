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
        <div className="row mb-2">

         <button className="btn btn-primary btn-lg pb-1 m-auto" onClick={getNextMeme}>
          Generate Next
        </button>
        </div>
       <div className="row">
       <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        {meme.title ? (
          <img
            className="img-fluid m-auto"
            src={meme.url}
            alt={meme.title}
          />
        ) : (
          <p>Loading...</p>
        )}
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};

render(<App />, document.getElementById("root"));
