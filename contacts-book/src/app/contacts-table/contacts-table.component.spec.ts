import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { provideMockStore } from "@ngrx/store/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

describe('ContactsTableComponent', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;

  const initialState = {};

  class MockRouter {
    navigateByUrl(url: string) {
      return url;
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsTableComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: Router, useClass: MockRouter},
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

  it('should redirect with contact ssn', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    const ssn = 5463;

    component.showContactDetail(ssn);

    const url = spy.calls.first().args[0];
    expect(url).toBe('contact/' + ssn);
  }));

});
