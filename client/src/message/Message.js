import React from "react";
import {format} from "timeago.js"
import "./Message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          alt="Profile"
          src="https://media.licdn.com/dms/image/C5603AQFCTfdJcIXIsQ/profile-displayphoto-shrink_800_800/0/1635741387597?e=1694649600&v=beta&t=PLoWbK1jvO4b3QxUsmTYaLdLFtion6f0cdmVGHX0tcc"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
