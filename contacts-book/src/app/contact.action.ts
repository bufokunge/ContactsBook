import {Action} from "@ngrx/store";
import {Contact} from "./contact";

/**
 * Tutorial:
 * https://coursetro.com/posts/code/151/Angular-Ngrx-Store-Tutorial---Learn-Angular-State-Management
 */

export const ADD_CONTACT = '[Contacts Table Component] Add Contact';

export class AddContact implements Action {
  readonly type = ADD_CONTACT;

  constructor(public payload: Contact) {}
}

export type Actions = AddContact; // e.g. add other actions: | EditContact | RemoveContact
