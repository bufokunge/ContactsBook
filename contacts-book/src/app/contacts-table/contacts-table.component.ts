import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { select, Store } from "@ngrx/store";
import { AddContact } from "../contact.action";
import { mockContactFactory } from "../contact.mocks";
import { MatDialog } from "@angular/material/dialog";
import { CreateContactComponent } from "../create-contact/create-contact.component";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  contacts: Observable<{[ssn: number]: SimplifiedContact}>;

  constructor(private store: Store<{ contacts: {[ssn: number]: SimplifiedContact} }>, public dialog: MatDialog) {
    this.contacts = store.pipe(select('contacts'));
  }

  ngOnInit(): void {
  }

  openNewContactDialog(): void {
    let contact: Contact = {
      address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: 0
    };

    const dialogRef = this.dialog.open(CreateContactComponent, {width: '250px', data: contact});

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog was closed');
      console.log('data', data);
      this.addContact(data);
    })
  }

  addContact(contact: Contact) {
    // TODO: add contact passed as parameter
    console.log(contact);

    const mockContactPromise = mockContactFactory(1);

    mockContactPromise.then(data => {
      const mockContact = data['contacts'][0]
      console.log('add contact', mockContact);

      this.store.dispatch(new AddContact(mockContact));
    });
  }
}
