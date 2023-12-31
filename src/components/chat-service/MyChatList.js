import React, { useEffect, useState } from 'react'
import { fetch_General } from '../../networkFns/fetchFns';
import { API_URL, CHAT_URL } from '../../Constants';

function MyChatList() {
const [myChatList, setMyChatList] = useState([]);


useEffect(() => {
    (async () => {
        const chatList = await fetch_General(
          "GET",
          `http://${CHAT_URL}/chat-service/findrooms`
        );
        setMyChatList(chatList)})();

        




}, []

);

console.log(myChatList);

function openPopup(path) {
    const newWindow = window.open(path, '_blank', 'width=560,height=700,noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }




  return (
    <div>
{myChatList !== undefined && myChatList !== null && myChatList.length !== 0 && myChatList.map(
    (mychat, index) => 
    <div key={index}>
        <span>{mychat.requestSubject === mychat.email1 ? mychat.email2 : mychat.email1}</span>
        <button onClick={
          () => {
            let buyer;
            if(mychat.requestSubject === mychat.email1) {

              buyer = mychat.email2

          } else {buyer = mychat.email1}
        
          openPopup(`/chatwith/${buyer}`)} 
          }><img src='/img/chatting.png' style={{widthd: '30px', height: '30px'}}/></button>
    </div>)}


    </div>
  )
}

export default MyChatList