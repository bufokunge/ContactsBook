import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Contact } from "../contact";

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


}
