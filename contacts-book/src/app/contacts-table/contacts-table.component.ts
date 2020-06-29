import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { select, Store } from "@ngrx/store";
import { AddContact } from "../contact.action";
import { mockContactFactory } from "../contact.mocks";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  contacts: Observable<{[ssn: number]: SimplifiedContact}>;

  constructor(private store: Store<{ contacts: {[ssn: number]: SimplifiedContact} }>) {
    this.contacts = store.pipe(select('contacts'));
  }

  ngOnInit(): void {
  }

  addContact(contact: Contact) {
    // TODO: add contact passed as parameter

    const mockContactPromise = mockContactFactory(1);

    mockContactPromise.then(data => {
      const mockContact = data['contacts'][0]
      console.log('add contact', mockContact);

      this.store.dispatch(new AddContact(mockContact));
    });
  }
}
