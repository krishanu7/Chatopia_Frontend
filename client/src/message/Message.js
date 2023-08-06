import React from "react";
import {format} from "timeago.js"
import "./Message.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          alt="Profile"
          src={PF + "person/noAvatar.png"}
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
