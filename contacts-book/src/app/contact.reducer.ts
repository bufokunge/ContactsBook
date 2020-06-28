import * as ContactActions from "./contact.action";
import {SimplifiedContact} from "./contact";

export const initialState: SimplifiedContact[] = [];

export function ContactReducer(state: SimplifiedContact[] = initialState, action: ContactActions.Actions) {

  switch (action.type) {
    case ContactActions.ADD_CONTACT:
      return [...state, action.payload];
    default:
      return state;
  }
}
