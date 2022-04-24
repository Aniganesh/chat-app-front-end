import { Action, Thunk, action, thunk } from "easy-peasy";

interface Contact {
  name: string;
  id: string;
}

interface ContactsState {
  contacts?: Contact[];
  setContacts: Action<ContactsState, Contact[] | undefined>;
  addContact: Action<ContactsState, Contact>;
}

const ContactsStore: ContactsState = {
  contacts: [],
  setContacts: action((state, payload) => {
    state.contacts = payload;
  }),
  addContact: action((state, payload) => {
    state.contacts = [...(state.contacts ?? []), payload];
  }),
};

export default ContactsStore;
