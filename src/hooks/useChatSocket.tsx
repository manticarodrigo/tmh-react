import { useEffect, useReducer } from 'react';

import { CurrentAuth } from '../store/reducers/AuthReducer';
import WebSocketService, { startConnection } from '../store/sockets/WebSocket';

export interface ChatMessage {
  id: string;
  from?: string;
  author: string;
  content: string;
  created_at: string;
}

interface ChatSocketState {
  socket?: WebSocketService;
  messages: ChatMessage[];
}

type ChatSocketActions =
  | { type: 'socket', payload: WebSocketService }
  | { type: 'message', payload: ChatMessage }
  | { type: 'messages', payload: ChatMessage[] };

const chatReducer = (state: ChatSocketState, action: ChatSocketActions) => {
  switch (action.type) {
    case 'socket':
      return { ...state, socket: action.payload };
    case 'message':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'messages':
      return { ...state, messages: action.payload };
    default:
      throw new Error('Invalid ChatSocketAction type.');
  }
};

const useChatSocket = (auth?: CurrentAuth) => {
  const [state, dispatch] = useReducer(chatReducer, { messages: []});

  const closeSocket = () => {
    const { socket } = state;
    if (socket && socket.socketRef) {
      socket.socketRef.close();
    }
  };

  useEffect(() => {
    if (auth) {
      startConnection()
        .then((instance: WebSocketService) => {
            console.log('socket', instance);
            dispatch({ type: 'socket', payload: instance });

            instance.initChatUser(auth.user.username);
            instance.addCallbacks(
              (messages) => {
                console.log('messages', messages);
                dispatch({ type: 'messages', payload: messages });
              },
              (message) => {
                console.log('message', message);
                dispatch({ type: 'message', payload: message });
              });
            instance.fetchMessages(auth.user.username);
          })
          .catch(error => {
            console.log(error);
        });
    }

    return closeSocket();
  }, [auth]);

  return state;
};

export default useChatSocket;
