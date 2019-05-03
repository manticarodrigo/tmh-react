import React, { ChangeEvent, FormEvent, memo, useState } from 'react';
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
  const [message, setMessage] = useState('');

  const handleMessageChanged = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (auth && socket) {
      const messageObject = {
        from: auth.user.username,
        text: message,
      };
      socket.newChatMessage(messageObject);
      setMessage('');
    }
  };

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
            {messages.map((msg, index) => (
              <p className="u-margin-hug--vert" key={index}>{msg.content}</p>
            ))}
          </div>
          <form className="chat__form" onSubmit={handleSendMessage}>
            <button className="chat__form__attachment" />
            <input
              className="chat__form__input"
              type="text"
              placeholder="Send a message"
              value={message}
              onChange={handleMessageChanged}
            />
            <button className="chat__form__submit" type="submit">Send</button>
          </form>
        </div>
      </aside>
    </footer>
  );
};

export default memo(CollabChat);
