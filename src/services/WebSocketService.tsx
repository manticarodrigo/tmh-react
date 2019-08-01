type Nullable<T> = T | null;

type Callbacks = {
  [propName: string]: (data: any) => void | undefined;
};

export default class WebSocketService {
  callbacks: Callbacks = {};
  protected socketRef: Nullable<WebSocket> = null;

  constructor(room_name: string) {
    const path = `ws://localhost:8000/ws/chat/${room_name}/`;

    if (path) {
      this.connect(path);
    } else {
      throw new Error('WS API path is not defined.');
    }
  }

  connect(path: string) {
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => console.log('socket open');
    this.socketRef.onmessage = (event: MessageEvent) => this.receive(event.data);
    this.socketRef.onerror = (event: Event) => console.log('socket error', event);
    this.socketRef.onclose = (event: CloseEvent) => {
      if (event.code !== 1000) {
        this.connect(path);
      }
    };
  }

  receive(data: any) {
    const parsedData = JSON.parse(data);
    console.log('parsedData', parsedData);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }

    this.callbacks[command](parsedData);
  }

  send(data: any) {
    const { stringify } = JSON;

    try {
      this.socketRef!.send(stringify({ ...data }));
    } catch (err) {
      console.log('send error', err.message);
    }
  }

  close() {
    console.log('socket close', this.socketRef);
    if (this.socketRef) {
      this.socketRef.close();
    }
  }
}
