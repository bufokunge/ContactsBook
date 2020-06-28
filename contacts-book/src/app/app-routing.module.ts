import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsTableComponent } from "./contacts-table/contacts-table.component";


const routes: Routes = [
  {path: '', component: ContactsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
