import { ChatMessage } from '../../hooks/useChatSocket';
import WebSocketService from './WebSocketService';

export interface ChatMessageForm {
  from: string;
  text: string;
}

enum CallbackOptions {
  FETCH_MESSAGES = 'fetch_messages',
  MESSAGES = 'messages',
  NEW_MESSAGE = 'new_message',
}

export default class ChatSocketSerivce extends WebSocketService {

  isReady = () => this.socketRef && this.socketRef.readyState === 1;

  fetchMessages = () => this.send({ command: 'fetch_messages' });

  sendMessage = (message: ChatMessageForm) => {
    this.send({ command: 'new_message', from: message.from, text: message.text });
  }

  addCallbacks(
    messagesCallback: (messages: ChatMessage[]) => void,
    newMessageCallback: (message: ChatMessage) => void,
  ) {
    this.callbacks[CallbackOptions.MESSAGES] = messagesCallback;
    this.callbacks[CallbackOptions.NEW_MESSAGE] = newMessageCallback;
  }

  send(data: any) {
    const { stringify } = JSON;

    try {
      this.socketRef!.send(stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  close() {
    console.log(this.socketRef);
    if (this.socketRef) {
      this.socketRef.close();
    }
  }
}

export const startConnection = (projectId: string): Promise<ChatSocketSerivce> => {
  const instance = new ChatSocketSerivce(projectId);

  return new Promise((resolve) => {
    const tryConnection = () => {
      setTimeout(() => {
          // Check if websocket state is OPEN
          if (instance.isReady()) {
            console.log('connection was made successfully...');
            return resolve(instance);
          } else {
            console.log('waiting for connection...');
            tryConnection();
          }
      }, 100); // wait 100 milliseconds for the connection...
    };

    tryConnection();
  });
};
