import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { provideMockStore } from "@ngrx/store/testing";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { mockContactFactory } from "../contact.mocks";

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

  it('should have as many rows as contacts or paginator page size', () => {
    const pageSize = component.paginator.pageSize;
    const mockContactPromise = mockContactFactory(pageSize + 1);

    return mockContactPromise.then(data => {
      component.dataSource.data = data['contacts'];
      fixture.detectChanges();
      let rowsNr = fixture.debugElement.nativeElement.querySelector('tbody').children.length;

      expect(rowsNr).toBe(pageSize);

      component.dataSource.data = data['contacts'].slice(0, pageSize - 1);
      fixture.detectChanges();
      rowsNr = fixture.debugElement.nativeElement.querySelector('tbody').children.length;

      expect(rowsNr).toBe(pageSize - 1);
    });

  });
});
