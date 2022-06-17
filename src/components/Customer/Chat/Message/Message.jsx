import React from "react";

import { format } from "timeago.js";
import "./message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message__wrapper own" : "message__wrapper"}>
      <div className="message__top">
        <p className="message__text">{message.text}</p>
      </div>
      <div className="message__bottom">{format(message.createdAt)}</div>
    </div>
  );
}
