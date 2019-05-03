import React, { memo, useEffect } from 'react';
import './CollabChat.scss';

import { CurrentAuth } from '../../store/reducers/AuthReducer';
import { Project } from '../../store/reducers/ProjectReducer';

import useChatSocket from '../../hooks/useChatSocket';

interface CollabChatProps {
  auth: CurrentAuth;
  project: Project;
}

const CollabChat = (props: CollabChatProps) => {
  const { auth, project } = props;
  const { socket, messages } = useChatSocket(auth);
  console.log(messages);
  // useEffect(() => {
  //   if (socket && auth && project) {
  //     const messageObject = {
  //       from: auth.user.username,
  //       text: 'test message',
  //     };
  //     socket.newChatMessage(messageObject);
  //   }
  // }, [socket, auth, project]);

  return (
    <footer>
      <aside className="chat">
        <div className="chat__container">
          <div className="chat__header">
            <div className="chat__header__title">
              <img src={require('../../assets/images/utility/chat.png')} />
              <h4 className="u-margin-hug--vert">Chat</h4>
            </div>
            <button className="chat__header__button" />
          </div>
          <div className="chat__messages">
            {messages.map((message, index) => (
              <p className="u-margin-hug--vert" key={index}>{message.content}</p>
            ))}
          </div>
          <div className="chat__util">
            <button className="chat__util__attachment" />
            <input className="chat__util__input" type="text" placeholder="Send a message" />
            <button className="chat__util__submit">Send</button>
          </div>
        </div>
      </aside>
    </footer>
  );
};

export default memo(CollabChat);
