import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSend = () => {
    //logic to send messages
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>
        Hello from kineticlion!{" "}
        <span role="img" aria-label="rocket-emoji">
          🚀
        </span>
      </h1>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={handleMessageSend} disabled={!input}>
        Send Message
      </button>

      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
}

export default App;
