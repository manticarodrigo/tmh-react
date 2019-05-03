import { ChatMessage } from '../../hooks/useChatSocket';

export interface ChatMessageForm {
  from: string;
  text: string;
}

type Nullable<T> = T | null;

enum CallbackOptions {
  INIT_CHAT = 'init_chat',
  FETCH_MESSAGES = 'fetch_messages',
  MESSAGES = 'messages',
  NEW_MESSAGE = 'new_message',
}

interface Callbacks {
  [propName: string]: (data: any) => void | undefined;
}

export default class WebSocketService {
  socketRef: Nullable<WebSocket> = null;
  callbacks: Callbacks = {};

  constructor() {
    const path = 'ws://localhost:8000/ws/chat/';

    if (path) {
      this.connect(path);
    } else {
      throw new Error('WS API path is not defined.');
    }
  }

  connect(path: string) {
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => console.log('socket open...');
    this.socketRef.onmessage = (event: MessageEvent) => this.socketNewMessage(event.data);
    this.socketRef.onerror = (event: Event) => console.log('socket error:', event);
    this.socketRef.onclose = () => this.connect(path);
  }

  socketNewMessage(data: any) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === CallbackOptions.MESSAGES) {
      this.callbacks[command](parsedData.messages);
    }
    if (command === CallbackOptions.NEW_MESSAGE) {
      this.callbacks[command](parsedData.message);
    }
  }

  initChatUser(username: string) {
    this.sendMessage({ username, command: 'init_chat' });
  }

  fetchMessages(username: string) {
    this.sendMessage({ username, command: 'fetch_messages' });
  }

  newChatMessage(message: ChatMessageForm) {
    this.sendMessage({ command: 'new_message', from: message.from, text: message.text });
  }

  addCallbacks(
    messagesCallback: (messages: ChatMessage[]) => void,
    newMessageCallback: (message: ChatMessage) => void,
  ) {
    this.callbacks[CallbackOptions.MESSAGES] = messagesCallback;
    this.callbacks[CallbackOptions.NEW_MESSAGE] = newMessageCallback;
  }

  sendMessage(data: any) {
    try {
      this.socketRef!.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const startConnection = (): Promise<WebSocketService> => {
  const instance = new WebSocketService();

  return new Promise((resolve) => {
    const tryConnection = () => {
      setTimeout(() => {
          // Check if websocket state is OPEN
          if (instance.socketRef && instance.socketRef.readyState === 1) {
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
