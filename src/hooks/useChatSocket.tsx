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

const useChatSocket = (auth?: CurrentAuth, projectId?: string) => {
  const [state, dispatch] = useReducer(chatReducer, { messages: []});

  const closeSocket = () => {
    const { socket } = state;
    if (socket && socket.socketRef) {
      socket.socketRef.close();
    }
  };

  useEffect(() => {
    if (auth && projectId) {
      startConnection(projectId)
        .then((instance: WebSocketService) => {
            dispatch({ type: 'socket', payload: instance });

            instance.initChatUser(auth.user.username);
            instance.addCallbacks(
              (messages) => {
                dispatch({ type: 'messages', payload: messages.reverse() });
              },
              (message) => {
                dispatch({ type: 'message', payload: message });
              });
            instance.fetchMessages(auth.user.username);
          });
    }

    return closeSocket();
  }, [auth, projectId]);

  return state;
};

export default useChatSocket;
