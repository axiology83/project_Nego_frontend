import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChatTalkList from "./ChatTalkList";
import { fetchFn } from "../../NetworkUtils";
import { API_URL, CHAT_URL } from "../../Constants";

const client = new Client({
  brokerURL: `ws://${CHAT_URL}/chat-service/wsstomp`,
});

function ChatRoom() {
  const [messageList, setMessageList] = useState([]);
  const [roomTitle, setRoomTitle] = useState(null);
  const email2 = useParams().email;
  const chatInput = useRef(null);
  const fileInput = useRef(null);

  const dto = { email2: email2 };
 

  useEffect(() => {
    fetchFn("POST", `http://${CHAT_URL}/chat-service/enter`, dto).then(
      (data) => {
        if (data.isExist) {
          setRoomTitle(data.roomInfo.title);
          setMessageList(data.messageList);
        } else {
          setRoomTitle(data.roomInfo.title);
        }
      }
    );
  }, [email2]);

  useEffect(() => {
    if (roomTitle) {
      console.log(roomTitle);
      client.onConnect = () => {
        client.subscribe(`/sub/chatroom/${roomTitle}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessageList((prevState) => [...prevState, newMessage]);
        });
      };
      client.activate();
    }
  }, [roomTitle]);

  function sendChatMessage() {
    const token = localStorage.getItem("jwt");
    const bearertoken = "Bearer " + token;
    const message = chatInput.current.value;
    client.publish({
      destination: "/pub/sendmessage",
      headers: { Authorization: bearertoken},
      body: JSON.stringify({
        roomTitle: roomTitle,
        receiver: email2,
        message: message,
      }),
    });

    chatInput.current.value = "";
  }

  function sendImgUrl(url) {
    const token = localStorage.getItem("jwt");
    const bearertoken = "Bearer " + token;
    const message = url;
    client.publish({
      destination: "/pub/sendmessage",
      headers: { Authorization: bearertoken},
      body: JSON.stringify({
        roomTitle: roomTitle,
        receiver: email2,
        message: message,
      }),
    });
  }

  const uploadImgCallBack = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);

    try {
      const response = await fetch(
        `${API_URL}/imgfile-service/uploadimg`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return `${API_URL}/imgfile-service/getimgdata?id=${data.result}`;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleFileChange() {
    const file = fileInput.current.files[0];
    if (file) {
      const url = await uploadImgCallBack(file);
      sendImgUrl(url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function onClickHandler(e) {
    e.preventDefault();
    sendChatMessage();
  }

  function handleEnterPress(e) {
    if (e.key === "Enter" && document.activeElement === chatInput.current) {
      e.preventDefault();
      sendChatMessage();
    }
  }

  return (
    <div className="chatroom">
      <header></header>
      {roomTitle !== null && <ChatTalkList messageList={messageList} />}

      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder="메세지 입력" className="sendmessage" onKeyDown={handleEnterPress} ref={chatInput} />
          <button className="chatbutton" onClick={onClickHandler}>전송</button>
          <br />
          {"이미지 파일 올리기 : "}
          <input type="file" onChange={handleFileChange} ref={fileInput} />
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
