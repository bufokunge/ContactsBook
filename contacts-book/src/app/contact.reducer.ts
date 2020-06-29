import * as ContactActions from "./contact.action";
import {SimplifiedContact} from "./contact";

export const initialState: {[ssn: string] : SimplifiedContact} = {};

export function ContactReducer(state: {[ssn: string] : SimplifiedContact} = initialState, action: ContactActions.Actions) {

  switch (action.type) {
    case ContactActions.ADD_CONTACT:
      return {...state, [action.payload.ssn]: action.payload};
    default:
      return state;
  }
}
