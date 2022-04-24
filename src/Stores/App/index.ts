import { Action, Thunk, action, thunk } from "easy-peasy";

type UUID = string;

interface AppState {
  userId?: string;
  setUserId: Action<AppState, string | undefined>;
  currentConversationId?: UUID;
  setCurrentConversation: Action<AppState, string>;
}

const AppStore: AppState = {
  userId: undefined,
  currentConversationId: undefined,
  setUserId: action((state, payload) => {
    state.userId = payload;
  }),
  setCurrentConversation: action((state, payload) => {
    state.currentConversationId = payload;
  }),
};

export default AppStore;
