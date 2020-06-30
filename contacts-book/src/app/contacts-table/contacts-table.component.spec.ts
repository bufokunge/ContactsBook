import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { provideMockStore } from "@ngrx/store/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

describe('ContactsTableComponent', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsTableComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        provideMockStore({initialState}),
      ],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsTableComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
