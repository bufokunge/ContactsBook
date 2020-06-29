import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Contact } from "../contact";
import { mockContactFactory } from "../contact.mocks";

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateContactComponent>,
              @Inject(MAT_DIALOG_DATA) public contact: Contact) { }

  ngOnInit(): void {
  }

  onSetMockData(): void {
    const mockContactPromise = mockContactFactory(1);

    mockContactPromise.then(data => {
      this.contact = data['contacts'][0];
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
