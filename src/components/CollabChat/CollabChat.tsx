import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './CollabChat.scss';

import { CurrentAuth } from 'store/reducers/AuthReducer';
import { Project } from 'store/reducers/ProjectReducer';

import useChatSocket from 'hooks/useChatSocket';
import { IChatMessage } from 'services/ChatSocketService';

interface ICollabChatProps {
  auth: CurrentAuth;
  project: Project;
}

const CollabChat = (props: ICollabChatProps) => {
  const { auth, project } = props;
  const { socket, messages } = useChatSocket(auth, project.id);
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
      socket.sendMessage(messageObject);
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

  const isConsecutiveMessage = (msg: IChatMessage, index: number) =>
    index > 0 && messages[index - 1].author === msg.author;

  const groupedMessages = messages.reduce((acc: IChatMessage[][], msg: IChatMessage, index: number) => {
    if (isConsecutiveMessage(msg, index)) {
      const lastArr = [...(acc.pop() || []), msg];
      return [...acc, lastArr];
    } else {
      return [...acc, [msg]];
    }
  }, []);

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
                {groupedMessages.map((msgs, index) => (
                  <li className="u-margin-bottom" key={index}>
                    <p className="u-margin-hug--vert"><b>{msgs[0].author}</b></p>
                    <ul className="u-list-unstyled u-margin-hug--vert">
                      {msgs.map((msg, subIndex) => (
                        <li key={subIndex}>
                          <p className="u-margin-hug--vert u-margin-left">{msg.content}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form className="chat__form" onSubmit={handleSendMessage}>
            <button className="chat__form__button chat__form__attachment" type="button" />
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

export default CollabChat;
