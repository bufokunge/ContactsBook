import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { select, Store } from "@ngrx/store";
import { AddContact, AddContactArray } from "../contact.action";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contactsObservable: Observable<{ [ssn: number]: SimplifiedContact }>;
  contacts: { [ssn: number]: SimplifiedContact };

  constructor(private store: Store<{ contacts: { [ssn: number]: SimplifiedContact } }>) {
    this.contactsObservable = store.pipe(select('contacts'));
    this.contactsObservable.subscribe(data => {
      this.contacts = data;
    });
  }

  addContact(contact: Contact) {
    if (!contact || contact.ssn === undefined) return;

    this.store.dispatch(new AddContact(contact));
  }

  getContactBySsn(ssn: number): Contact {
    if (this.contacts && this.contacts[ssn]) {
      return (this.contacts[ssn] as Contact);
    }

    return undefined;
  }

  getPageData(page: number, pageSize: number): any {
    const pageItems = Object.values(this.contacts).slice(page * pageSize, page * pageSize + pageSize);

    return {data: pageItems, length: Object.values(this.contacts).length};
  }

  addContactArray(contacts: Contact[]) {
    if (!contacts || contacts.length <= 0) return;
    this.store.dispatch(new AddContactArray(contacts));
  }
}
