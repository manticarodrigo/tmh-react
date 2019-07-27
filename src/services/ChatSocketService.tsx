import WebSocketService from './WebSocketService';

export interface IChatMessage {
  id: string;
  from?: string;
  author: string;
  content: string;
  created_at: string;
}

export interface IChatMessageForm {
  from: string;
  text: string;
}

enum CallbackOptions {
  FETCH_MESSAGES = 'fetch_messages',
  MESSAGES = 'messages',
  NEW_MESSAGE = 'new_message',
}

export default class ChatSocketSerivce extends WebSocketService {

  isReady = () => (
    this.socketRef && this.socketRef.readyState === 1
  )

  fetchMessages = () => (
    this.send({ command: CallbackOptions.FETCH_MESSAGES })
  )

  sendMessage = (message: IChatMessageForm) => (
    this.send({ command: CallbackOptions.NEW_MESSAGE, from: message.from, text: message.text })
  )

  addCallbacks(
    messagesCallback: (messages: IChatMessage[]) => void,
    newMessageCallback: (message: IChatMessage) => void,
  ) {
    this.callbacks[CallbackOptions.MESSAGES] = messagesCallback;
    this.callbacks[CallbackOptions.NEW_MESSAGE] = newMessageCallback;
  }
}

export const startConnection = (projectId: string): Promise<ChatSocketSerivce> => {
  const instance = new ChatSocketSerivce(projectId);

  return new Promise((resolve) => {
    const tryConnection = () => {
      setTimeout(() => {
          // Check if websocket state is OPEN
          if (instance.isReady()) {
            return resolve(instance);
          } else {
            tryConnection();
          }
      }, 100); // wait 100 milliseconds for the connection...
    };

    tryConnection();
  });
};
