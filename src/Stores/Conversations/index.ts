import { TRootStore } from "../";
import { Action, Thunk, action, thunk } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";

interface Conversations {
  id: string;
  recipients: string[];
  messages?: { text: string; fromMe?: boolean }[];
}

interface ConversationsState {
  conversations?: Conversations[];
  setConversations: Action<ConversationsState, Conversations[] | undefined>;
  addConversation: Action<ConversationsState, Conversations>;
  addMessageToConversation: Thunk<
    ConversationsState,
    {
      message: string;
      recipients: string[];
      sender: string;
      conversationId: string;
    },
    null,
    TRootStore
  >;
}

export const ConversationsStore: ConversationsState = {
  conversations: [],
  setConversations: action((state, payload) => {
    state.conversations = payload;
  }),
  addConversation: action((state, payload) => {
    state.conversations = [...(state.conversations ?? []), payload];
  }),
  addMessageToConversation: thunk(
    (
      actions,
      { message, recipients, sender, conversationId },
      { getState, getStoreState }
    ) => {
      const { userId } = getStoreState().AppStore;
      const allExistingConversations = getState().conversations ?? [];
      const existingConversation = allExistingConversations?.find(
        (c) => c.id === conversationId
      );
      if (existingConversation) {
        const newConversationsArray = allExistingConversations.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              messages: [
                ...(c.messages ?? []),
                { text: message, fromMe: sender === userId },
              ],
            };
          }
          return c;
        });
        actions.setConversations(newConversationsArray);
        return;
      }
      actions.addConversation({
        id: conversationId ?? uuidv4,
        recipients,
        messages: [{ text: message, fromMe: sender === userId }],
      });
    }
  ),
};

export default ConversationsStore;
