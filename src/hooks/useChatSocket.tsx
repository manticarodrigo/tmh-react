import { useEffect, useReducer } from 'react';

import ChatSocketService, { ChatMessage, startConnection } from 'services/ChatSocketService';
import { CurrentAuth } from 'store/reducers/AuthReducer';

type ChatSocketState = {
  socket?: ChatSocketService;
  messages: ChatMessage[];
};

type ChatSocketAction =
  | { type: 'socket', payload: ChatSocketService }
  | { type: 'message', payload: ChatMessage }
  | { type: 'messages', payload: ChatMessage[] };

const openSockets: ChatSocketService[] = [];

const chatReducer = (state: ChatSocketState, action: ChatSocketAction) => {
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
              (data: any) => {
                dispatch({ type: 'messages', payload: data.messages });
              },
              (data: any) => {
                dispatch({ type: 'message', payload: data.message });
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
