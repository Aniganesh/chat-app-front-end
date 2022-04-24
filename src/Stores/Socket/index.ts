import { Action, action } from "easy-peasy";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket?: Socket;
  createSocket: Action<SocketState, string>;
  destroySocket: Action<SocketState, void>;
}

export const SocketStore: SocketState = {
  socket: undefined,
  createSocket: action((state, payload) => {
    state.socket = io("http://localhost:5000", { query: { id: payload } });
  }),
  destroySocket: action((state) => {
    if (state.socket) {
      state.socket.close();
      state.socket = undefined;
    }
  }),
};

export default SocketStore;
