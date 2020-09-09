import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./Message.css";

const Message = ({ username, message }) => {
  const isUser = username === message.username;
  return (
    <div className={`message ${isUser && "message_user"}`}>
      <Card style={{ backgroundColor: isUser ? "#0b81ff" : "#e9e9eb" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message.username} : {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
