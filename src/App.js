import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import firebase from "firebase";

import "./App.css";
import Message from "./Message";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const handleMessageSend = (event) => {
    //logic to send messages
    event.preventDefault();
    db.collection("messages").add({
      username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>
        Welcome {`${username}! `}
        <span role="img" aria-label="rocket-emoji">
          😊
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
          <Message username={username} message={message} />
        ))}
      </form>
    </div>
  );
}

export default App;
