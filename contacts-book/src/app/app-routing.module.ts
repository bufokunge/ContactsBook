import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsTableComponent } from "./contacts-table/contacts-table.component";
import {ContactDetailComponent} from "./contact-detail/contact-detail.component";


export const routes: Routes = [
  {path: '', component: ContactsTableComponent},
  {path: 'contact/:ssn', component: ContactDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
