import { useEffect, useReducer } from 'react';

import { CurrentAuth } from '../store/reducers/AuthReducer';
import ChatSocketService, { startConnection } from '../store/sockets/ChatSocketService';

export interface ChatMessage {
  id: string;
  from?: string;
  author: string;
  content: string;
  created_at: string;
}

interface ChatSocketState {
  socket?: ChatSocketService;
  messages: ChatMessage[];
}

type ChatSocketActions =
  | { type: 'socket', payload: ChatSocketService }
  | { type: 'message', payload: ChatMessage }
  | { type: 'messages', payload: ChatMessage[] };

const openSockets: ChatSocketService[] = [];

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

  useEffect(() => {
    if (auth && projectId) {
      startConnection(projectId)
        .then((instance: ChatSocketService) => {
            dispatch({ type: 'socket', payload: instance });
            openSockets.push(instance);

            instance.addCallbacks(
              (messages) => {
                dispatch({ type: 'messages', payload: messages.reverse() });
              },
              (message) => {
                dispatch({ type: 'message', payload: message });
              });
            instance.fetchMessages();
          });
    }

    return () => {
      openSockets.forEach((socket) => {
        socket.close();
      });
    };
  }, [auth, projectId]);

  return state;
};

export default useChatSocket;
