import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Container from "./components/Container/Container";

function App() {
  const [prompt, setPrompt] = useState({
    "most important": [],
    "more important": [],
    "normal": [],
    "negative": [],
    "more negative": [],
    "most negative": []
  });

  function addPropmt(name, values) {
    setPrompt(prevData => ({
      ...prevData,
      [name]: values
    }));
  }

  function copyAll() {
    let text = '';
    text = text + "Positive: "
    text = text + genPositive();
    text = text + "\nNegative: "
    text = text + genNegative();
    navigator.clipboard.writeText(text);
  }

  function copyPositive() {
    navigator.clipboard.writeText(genPositive());
  }

  function copyNegative() {
    navigator.clipboard.writeText(genNegative());
  }

  function genPositive() {
    let text = "";

    prompt["most important"].forEach(element => {
      text = text + "((" + element + ")), "
    });

    if (prompt["more important"].length !== 0) {
      if (text !== "") {
        text = text + "\n";
      }
    }

    prompt["more important"].forEach(element => {
      text = text + "(" + element + "), "
    });

    if (prompt["normal"].length !== 0) {
      if (text !== "") {
        text = text + "\n";
      }
    }

    prompt["normal"].forEach(element => {
      text = text + "" + element + ", "
    });

    return text;
  }

  function genNegative() {
    let text = "";

    prompt["negative"].forEach(element => {
      text = text + "" + element + ", "
    });

    if (prompt["more negative"].length !== 0) {
      if (text !== "") {
        text = text + "\n";
      }
    }

    prompt["more negative"].forEach(element => {
      text = text + "(" + element + "), "
    });

    if (prompt["most negative"].length !== 0) {
      if (text !== "") {
        text = text + "\n";
      }
    }

    prompt["most negative"].forEach(element => {
      text = text + "((" + element + ")), "
    });
    
    return text;
  }

  return (
    <>
      <Header />
      <button className="button" id="copy" onClick={copyAll}>
        copy all
      </button>
      <section id="positive">
        <Container level={"most important"} color={"#32ff20"} update={addPropmt}/>
        <Container level={"more important"} color={"#77FF5F"} update={addPropmt}/>
        <Container level={"normal"} color={"#BBFF9D"} update={addPropmt}/>
        <div className="button-box">
          <button className="button" id="positive-button" onClick={copyPositive}>
          copy posittive
          </button>
        </div>
      </section>
      <section id="negative">
        <Container level={"negative"} color={"#FF9797"} update={addPropmt}/>
        <Container level={"more negative"} color={"#F15454"} update={addPropmt}/>
        <Container level={"most negative"} color={"#E21111"} update={addPropmt}/>
        <div className="button-box">
          <button className="button" id="negative-button" onClick={copyNegative}>
          copy negative
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
