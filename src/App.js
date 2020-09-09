import React, { useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSend = (event) => {
    //logic to send messages
    event.preventDefault();
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
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Enter a message...</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleMessageSend}
            disabled={!input}
          >
            Send Message
          </Button>
        </FormControl>
        {messages.map((message) => (
          <Message text={message} />
        ))}
      </form>
    </div>
  );
}

export default App;
