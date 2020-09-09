import React, { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card style={{ backgroundColor: isUser ? "#0b81ff" : "#e9e9eb" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {!isUser && `${message.username || "Anonymous"}: `}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
