import * as ContactActions from "./contact.action";
import {SimplifiedContact} from "./contact";

export const initialState: {[ssn: string] : SimplifiedContact} = {};

export function ContactReducer(state: {[ssn: string] : SimplifiedContact} = initialState, action: ContactActions.Actions) {

  switch (action.type) {
    case ContactActions.ADD_CONTACT:
      return {...state, [action.payload.ssn]: action.payload};
    case ContactActions.ADD_CONTACT_ARRAY:
      let tmpContacts = {...state};

      action.payload.forEach(contact => {
        tmpContacts[contact.ssn] = contact;
      });

      return tmpContacts;
    default:
      return state;
  }
}
