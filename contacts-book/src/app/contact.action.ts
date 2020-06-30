import { Action } from "@ngrx/store";
import { Contact } from "./contact";

/**
 * Tutorial:
 * https://coursetro.com/posts/code/151/Angular-Ngrx-Store-Tutorial---Learn-Angular-State-Management
 */

export const ADD_CONTACT = '[Contacts Table Component] Add Contact';
export const ADD_CONTACT_ARRAY = '[Contacts Table Component] Add Contact Array';

export class AddContact implements Action {
  readonly type = ADD_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class AddContactArray implements Action {
  readonly type = ADD_CONTACT_ARRAY;

  constructor(public payload: Contact[]) {
  }
}

export type Actions = AddContact | AddContactArray;
