import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { By } from "@angular/platform-browser";

describe('ContactsTableComponent', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;
  let store: MockStore;
  const initialState = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsTableComponent],
      providers: [
        //StoreModule.forRoot({ contacts: ContactReducer }),
        provideMockStore({initialState}),
      ],
      imports: [
        //StoreModule.forRoot({ contacts: ContactReducer }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsTableComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    //store = TestBed.inject(MockStore);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should add user to table when add is clicked', () => {
    clickByCSS('#addContactBtn');

    expect(true).toBe(true);
  });*/

  /**
   * From https://ngrx.io/guide/store/testing
   * @param selector
   */
  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  }
});
