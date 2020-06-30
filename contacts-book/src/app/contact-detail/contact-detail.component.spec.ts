import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailComponent } from './contact-detail.component';
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { provideMockStore } from "@ngrx/store/testing";

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;
  let initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState})
      ],
      declarations: [ ContactDetailComponent ],
      imports: [
        RouterModule.forRoot([]),
        MatInputModule,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
