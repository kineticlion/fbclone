import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

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
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
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
      <img
        style={{ margin: 10 }}
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
      />
      <h1>
        Welcome {`${username}! `}
        <span role="img" aria-label="rocket-emoji">
          😊
        </span>
      </h1>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel htmlFor="my-input">Enter a message...</InputLabel>
          <Input
            className="app__formInput"
            id="my-input"
            aria-describedby="my-helper-text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__formButton"
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleMessageSend}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
