import React, { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messageListRef, setMessageListRef] = useState();

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

  const handleToggleButton = () => setIsCollapsed(!isCollapsed);

  const scrollToBottom = () => {
    if (messageListRef) {
      const chat = messageListRef;
      const scrollHeight = chat.scrollHeight;
      const height = chat.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => scrollToBottom(), [messages]);

  return (
    <footer>
      <aside className={`chat${isCollapsed ? ' chat--collapsed' : ''}`}>
        <div className="chat__container">
          <div className="chat__header">
            <div className="chat__header__image">
              <img src={require('../../assets/images/utility/chat.png')} />
            </div>
            <button className="chat__header__button" onClick={handleToggleButton} />
          </div>
          <div className="chat__messages" ref={(ref) => setMessageListRef(ref)}>
            {messages && (
              <ul className="u-list-unstyled u-margin-hug--vert">
                {messages.map((msg, index) => (
                  <li className="u-margin-hug--vert" key={index}>{msg.content}</li>
                ))}
              </ul>
            )}
          </div>
          <form className="chat__form" onSubmit={handleSendMessage}>
            <button className="chat__form__button chat__form__attachment" />
            <input
              className="chat__form__input"
              type="text"
              placeholder="Send a message"
              value={message}
              onChange={handleMessageChanged}
            />
            <button className="chat__form__button chat__form__submit" type="submit" />
          </form>
        </div>
      </aside>
    </footer>
  );
};

export default memo(CollabChat);
