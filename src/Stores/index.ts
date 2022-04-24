import { SocketStore } from "Stores/Socket";
import { createStore, createTypedHooks, persist } from "easy-peasy";
import AppStore from "Stores/App";
import ContactsStore from "Stores/Contacts";
import ConversationsStore from "Stores/Conversations";

export const RootStore = {
  AppStore,
  ContactsStore,
  ConversationsStore,
  SocketStore,
};

export type TRootStore = typeof RootStore;

const store = createStore(
  persist(RootStore, { storage: localStorage, deny: ["SocketStore"] }),
  {
    version: 2,
  }
);
export const { useStoreState, useStoreActions, useStoreDispatch } =
  createTypedHooks<TRootStore>();
export default store;
