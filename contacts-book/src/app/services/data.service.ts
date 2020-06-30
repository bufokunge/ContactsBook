import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { select, Store } from "@ngrx/store";
import { AddContact } from "../contact.action";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contactsObservable: Observable<{[ssn: number]: SimplifiedContact}>;
  contacts: {[ssn: number]: SimplifiedContact};

  constructor(private store: Store<{ contacts: {[ssn: number]: SimplifiedContact} }>) {
    this.contactsObservable = store.pipe(select('contacts'));
    this.contactsObservable.subscribe(data => {
      this.contacts = data;
    });
  }

  addContact(contact: Contact) {
    if (!contact) return;

    this.store.dispatch(new AddContact(contact));
  }

  getContactBySsn(ssn: number): Contact {
    console.log(this.contacts);
    console.log(ssn);

    if (this.contacts && this.contacts[ssn]) {
      return (this.contacts[ssn] as Contact);
    }

    return undefined;
  }
}
