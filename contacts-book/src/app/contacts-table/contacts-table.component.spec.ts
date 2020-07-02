import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { provideMockStore } from "@ngrx/store/testing";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { mockContactFactory } from "../contact.mocks";
import { DataService } from "../services/data.service";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { of } from "rxjs";
import { Contact } from "../contact";
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { Location } from "@angular/common";

describe('ContactsTableComponent', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;
  let dataService: DataService;
  let location: Location;
  let router: Router;
  let dialog: MatDialog;

  const initialState = {};

  class MockDataService {
    contacts = {};

    getPageData(pageIndex: number, pageSize: number) {
      const pageItems = Object.values(this.contacts).slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
      return {data: pageItems, length: Object.values(this.contacts).length};
    };

    addContact(contact: Contact) {
    };
  }

  class MockDialog {
    open() {
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsTableComponent],
      providers: [
        {provide: MatDialogRef, useClass: MockDialog},
        {provide: DataService, useClass: MockDataService},
        provideMockStore({initialState}),
      ],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'contact/:ssn', component: ContactDetailComponent}]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsTableComponent);
    component = fixture.debugElement.componentInstance;
    dataService = TestBed.inject(DataService);

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect with contact ssn when row is clicked', async(() => {
    fixture.ngZone.run(() => {
      const mockContactPromise = mockContactFactory(1);

      return mockContactPromise.then(data => {
        dataService.contacts = data['contacts'];
        component.setPageData();
        fixture.detectChanges();


        fixture.debugElement.nativeElement.querySelector('tbody').children[0].click();
        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/contact/' + +fixture.debugElement.nativeElement.querySelector('tbody').children[0].children[0].textContent);
        });
      });
    });
  }));

  it('should have as many rows as contacts or paginator page size', () => {
    const pageSize = component.pageSize;
    const mockContactPromise = mockContactFactory(pageSize + 1);

    return mockContactPromise.then(data => {
      // test with less items than page size
      dataService.contacts = data['contacts'].slice(0, pageSize - 1);
      component.setPageData();

      fixture.detectChanges();
      let rowsNr = fixture.debugElement.nativeElement.querySelector('tbody').children.length;

      expect(rowsNr).toBe(pageSize - 1);

      // test with more items than page size
      dataService.contacts = data['contacts'];
      component.setPageData();

      fixture.detectChanges();
      rowsNr = fixture.debugElement.nativeElement.querySelector('tbody').children.length;

      expect(rowsNr).toBe(pageSize);
    });

  });

  it('should open dialog when add button is clicked', () => {
    const spy = spyOn(component, 'openNewContactDialog').and.callThrough();
    const dialogRefSpyObj = jasmine.createSpyObj({afterClosed: of({}), close: null});
    dialogRefSpyObj.componentInstance = {body: ''};
    const dialogSpy = spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    const addButton = fixture.debugElement.nativeElement.querySelector('#addContactBtn');
    addButton.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should update paginator data on page change', () => {
    const spy = spyOn(component, 'setPageData').and.callThrough();
    const serviceSpy = spyOn(dataService, 'getPageData');

    component.pageIndex = 0;
    component.pageSize = 5;

    const newIndex = 3;
    const newSize = 7;

    component.onChangePage({pageIndex: newIndex, pageSize: newSize});

    expect(spy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.pageIndex).toBe(newIndex);
    expect(component.pageSize).toBe(newSize);
  });
});

