import { useEffect, useState } from 'react';

import { CurrentAuth } from '../store/reducers/AuthReducer';
import WebSocketService, { startConnection } from '../store/sockets/WebSocket';

const useChatSocket = (auth?: CurrentAuth) => {
  const [socket, setSocket] = useState<WebSocketService>();

  useEffect(() => {
    if (auth) {
      startConnection()
        .then((instance: WebSocketService) => {
            console.log('socket', instance);
            setSocket(instance);

            instance.initChatUser(auth.user.username);
            instance.addCallbacks(
              (messages) => {
                console.log('messages', messages);
              },
              (message) => {
                console.log('message', message);
              });
            instance.fetchMessages(auth.user.username);
          })
          .catch(error => {
            console.log(error);
        });
    }
  }, [auth]);

  return socket;
};

export default useChatSocket;
