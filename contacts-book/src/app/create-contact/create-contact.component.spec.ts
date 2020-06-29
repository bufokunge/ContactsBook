import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactComponent } from './create-contact.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContactComponent],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: {
            address: "", description: "", email: "", firstName: "", lastName: "", phone: "", ssn: 0
          }}
      ],
      imports: [
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form fields after init', () => {
    const firstName = fixture.debugElement.nativeElement.querySelector('#firstNameInput').textContent;
    const lastName = fixture.debugElement.nativeElement.querySelector('#lastNameInput').textContent;
    const ssn = fixture.debugElement.nativeElement.querySelector('#ssnInput').textContent;
    const address = fixture.debugElement.nativeElement.querySelector('#addressInput').textContent;
    const phone = fixture.debugElement.nativeElement.querySelector('#phoneInput').textContent;
    const email = fixture.debugElement.nativeElement.querySelector('#emailInput').textContent;
    const description = fixture.debugElement.nativeElement.querySelector('#descInput').textContent;

    expect(firstName).toBe('');
    expect(lastName).toBe('');
    expect(ssn).toBe('');
    expect(address).toBe('');
    expect(phone).toBe('');
    expect(email).toBe('');
    expect(description).toBe('\n    ');
  });

  it('should close dialog after cancel is clicked', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('should close dialog after submit is clicked', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#submitContactBtn');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

});
