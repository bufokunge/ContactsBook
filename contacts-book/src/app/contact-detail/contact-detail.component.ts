import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  ssn: number;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.ssn = +this.route.snapshot.paramMap.get('ssn');
    /*this.contact = this.data.getContactBySsn(this.ssn);
    console.log(this.contact);
    /*this.ssn = +this.route.snapshot.paramMap.get("contact");
    console.log(this.ssn);*/
  }

}
