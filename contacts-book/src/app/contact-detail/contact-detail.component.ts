import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact = {address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: 0};
  ssn: number;

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.ssn = +this.route.snapshot.paramMap.get('ssn');
    this.contact = this.data.getContactBySsn(this.ssn);

    if (!this.contact) {
      this.contact = {address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: 0}
      this.router.navigateByUrl('');
    }
  }

}
