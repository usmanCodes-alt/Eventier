import React, { useEffect, useState, useContext, useRef } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import queryString from "query-string";

import UserContext from "../../../context/auth-context";
import Conversation from "./Conversations/Conversation";
import Message from "./Message/Message";
import Header from "../customerHeader/Header";
import { default as ServiceProviderHeader } from "../../ServiceProvider/Header/Header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./chat.css";

export default function Chat() {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const urlData = queryString.parse(location.search);

  const [showLoading, setShowLoading] = useState(false);
  const [conversations, setConversations] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivingMessage, setArrivingMessage] = useState(null);
  const [newConversationCreated, setNewConversationCreated] = useState(false);
  const socketRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  useEffect(() => {
    // socketRef.current = io("ws://localhost:8900");
    socketRef.current = io("https://shielded-inlet-56201.herokuapp.com/");
    socketRef.current.on("get-message", (data) => {
      console.log("get-message event");
      setArrivingMessage({
        senderEmail: data.senderUserEmail,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      console.log("disconnecting");
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Setting message");
    arrivingMessage &&
      currentChat?.members.includes(arrivingMessage.senderEmail) &&
      setMessages((previousState) => [...previousState, arrivingMessage]);
  }, [arrivingMessage, currentChat]);

  useEffect(() => {
    socketRef.current.emit("addUser", localStorage.getItem("email"));
  }, []);

  // get all conversations of this user when the page loads
  const getConversations = async () => {
    console.log("Getting old conversations");
    setShowLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_CHAT_APP_MONGO_URL +
          "/chat-api/conversation/" +
          localStorage.getItem("email")
      );
      console.log("user conversations", response.data);
      setShowLoading(false);
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // check if you have to create a new conversation
    const {
      new_conversation: newConversation,
      sp_email: serviceProviderEmail,
    } = urlData;

    if (newConversation) {
      console.log("Creating conversation");
      const createConversation = async () => {
        try {
          setShowLoading(true);
          const response = await axios.post(
            process.env.REACT_APP_CHAT_APP_MONGO_URL + "/chat-api/conversation",
            {
              customerEmail: localStorage.getItem("email"),
              serviceProviderEmail: serviceProviderEmail,
            }
          );

          setShowLoading(false);
          console.log(response);
          setCurrentChat(response.data);
          setNewConversationCreated(true);
        } catch (error) {
          console.log(error);
        }
      };

      createConversation();
    }

    getConversations();
  }, []);

  useEffect(() => {
    getConversations();
  }, [newConversationCreated]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) {
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_CHAT_APP_MONGO_URL}/chat-api/messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onConversationClicked = (conversation) => {
    console.log("Setting conversation", conversation);
    setCurrentChat(conversation);
  };

  const onMessageInputAreaChanged = (e) => {
    setNewMessage(e.target.value);
  };

  const onSendMessageClicked = async (e) => {
    e.preventDefault();
    const message = {
      eventierUserEmail: localStorage.getItem("email"),
      text: newMessage,
      conversationId: currentChat._id,
    };

    console.log("send-message event fired");
    socketRef.current.emit("send-message", {
      senderUserEmail: localStorage.getItem("email"),
      receiverUserEmail: currentChat.members.find(
        (member) => member !== localStorage.getItem("email")
      ),
      text: newMessage,
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_CHAT_APP_MONGO_URL + "/chat-api/messages",
        message
      );
      setMessages([...messages, response.data.message]);
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };

  return (
    <React.Fragment>
      {JSON.parse(localStorage.getItem("roles")).includes(
        "service_provider"
      ) ? (
        <ServiceProviderHeader />
      ) : (
        <Header />
      )}
      <div className="chat__container">
        <div className="chat__all-chats">
          <div className="chat__menu-wrapper">
            {conversations &&
              conversations.map((conversation) => (
                <div onClick={onConversationClicked.bind(this, conversation)}>
                  <Conversation
                    conversation={conversation}
                    currentUserEmail={localStorage.getItem("email")}
                    key={conversation._id}
                  />
                </div>
              ))}
          </div>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        <div className="chat__current-chat">
          <div className="chat__current-chat-wrapper">
            {currentChat ? (
              <React.Fragment>
                <div className="chat__conversation">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={
                          message.senderEmail === localStorage.getItem("email")
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="chat__input-section">
                  <textarea
                    className="chat__input"
                    placeholder="Write something.."
                    onChange={onMessageInputAreaChanged}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chat__send-btn"
                    onClick={onSendMessageClicked}
                  >
                    Send
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <span className="chat__no-conversation-text">Start Chat</span>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
