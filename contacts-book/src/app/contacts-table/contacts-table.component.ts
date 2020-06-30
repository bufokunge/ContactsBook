import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { MatDialog } from "@angular/material/dialog";
import { CreateContactComponent } from "../create-contact/create-contact.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";

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

  }

  constructor(public dialog: MatDialog, private data: DataService, private router: Router) {
    this.contacts = this.data.contactsObservable;
    console.log(this.data);

    this.contacts.subscribe(data => {
      if (data) {
        this.dataSource.data = Object.values(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openNewContactDialog(): void {
    let contact: Contact = {
      address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: undefined
    };

    const dialogRef = this.dialog.open(CreateContactComponent, {width: '250px', data: contact});

    dialogRef.afterClosed().subscribe(data => {
      this.data.addContact(data);
    })
  }

  showContactDetail(contactSsn: number) {
    console.log('click', contactSsn);

    this.router.navigateByUrl('contact/' + contactSsn);
  }
}
