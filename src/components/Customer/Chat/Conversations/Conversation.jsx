import axios from "axios";
import React, { useEffect, useState } from "react";

import "./conversation.css";

export default function Conversation({ conversation, currentUserEmail }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const otherUserEmail = conversation.members.find(
      (memberEmail) => memberEmail !== currentUserEmail
    );

    console.log(`Calling api for ${otherUserEmail}`);

    const getUser = async () => {
      const response = await axios.get(
        "http://localhost:3000/get/" + otherUserEmail
      );
      setUser(response.data.EventierUserRow[0]);
    };

    getUser();
  }, [currentUserEmail, conversation]);

  useEffect(() => {
    console.log("user set");
  }, [user]);

  if (!user) {
    return <h4>Please wait..</h4>;
  }
  return (
    <div className="conversation__wrapper">
      <span className="conversation__name">
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
