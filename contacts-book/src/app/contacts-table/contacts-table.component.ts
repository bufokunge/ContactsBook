import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Contact, SimplifiedContact } from "../contact";
import { MatDialog } from "@angular/material/dialog";
import { CreateContactComponent } from "../create-contact/create-contact.component";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { mockContactFactory } from "../contact.mocks";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  contacts: Observable<{[ssn: number]: SimplifiedContact}>;

  dataSource = new MatTableDataSource<SimplifiedContact>()
  displayedColumns: string[] = ['ssn', 'firstName', 'lastName'];

  mockContacts: number;

  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 0;

  constructor(public dialog: MatDialog, private data: DataService, private router: Router) {
  }

  ngOnInit() {
    this.setPageData();
  }

  setPageData() {
    const response = this.data.getPageData(this.pageIndex, this.pageSize);

    if (response) {
      this.dataSource.data = response.data;
      this.length = response.length;
    }
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
    this.router.navigateByUrl('contact/' + contactSsn);
  }

  onChangePage(event) {
    this.setPageData();
  }

  createMockData() {
    if (this.mockContacts === undefined || this.mockContacts === null) return;

    const mockContactPromise = mockContactFactory(+this.mockContacts);

    mockContactPromise.then(data => {
      this.data.addContactArray(data['contacts']);
      this.setPageData();
    });

  }
}
