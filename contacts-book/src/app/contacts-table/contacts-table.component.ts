import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {Contact, SimplifiedContact} from "../contact";
import { select, Store } from "@ngrx/store";
import {AddContact} from "../contact.action";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  contacts: Observable<SimplifiedContact[]>;

  constructor(private store: Store<{ contacts: SimplifiedContact[] }>) {
    this.contacts = store.pipe(select('contacts'));
  }

  ngOnInit(): void {
  }

  addContact(contact: Contact) {
    console.log('add contact', contact);

    const c: Contact = {
      firstName: 'first',
      lastName: 'last',
      ssn: 1,
      address: 'address',
      phone: '0123',
      email: 'test@mail.com',
      description: 'some text',
    };

    this.store.dispatch(new AddContact(c));
  }
}
