import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { select, Store } from "@ngrx/store";
import { AddContact } from "../contact.action";
import { MatDialog } from "@angular/material/dialog";
import { CreateContactComponent } from "../create-contact/create-contact.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  contacts: Observable<{[ssn: number]: SimplifiedContact}>;

  dataSource = new MatTableDataSource<SimplifiedContact>()
  displayedColumns: string[] = ['ssn', 'firstName', 'lastName'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.contacts.subscribe(data => {
      console.log(data);
      if (data) {
        this.dataSource.data = Object.values(data);
        this.dataSource.paginator = this.paginator;
      }
    });
    //this.dataSource.paginator = this.paginator;
  }

  constructor(private store: Store<{ contacts: {[ssn: number]: SimplifiedContact} }>, public dialog: MatDialog) {
    this.contacts = store.pipe(select('contacts'));
  }

  openNewContactDialog(): void {
    let contact: Contact = {
      address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: undefined
    };

    const dialogRef = this.dialog.open(CreateContactComponent, {width: '250px', data: contact});

    dialogRef.afterClosed().subscribe(data => {
      this.addContact(data);
    })
  }

  addContact(contact: Contact) {
    if (!contact) return;

    this.store.dispatch(new AddContact(contact));
  }
}
