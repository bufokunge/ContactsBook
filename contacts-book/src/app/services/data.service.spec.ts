import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { provideMockStore } from "@ngrx/store/testing";
import { SimplifiedContact } from "../contact";
import { mockContactFactory } from "../contact.mocks";

describe('DataService', () => {
  let service: DataService;
  const initialState: { [ssn: number]: SimplifiedContact } = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ],
      imports: []
    }).compileComponents();

    service = TestBed.inject(DataService);
    service.contacts = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return contact by ssn', () => {
    const mockContactPromise = mockContactFactory(3);

    return mockContactPromise.then(data => {
      const mockContacts = data['contacts'];

      let contact = service.getContactBySsn(data['contacts'][0].ssn);
      expect(contact).toBeUndefined();

      mockContacts.forEach(contact => {
        service.contacts[contact.ssn] = contact;
      });

      contact = service.getContactBySsn(data['contacts'][0].ssn);
      expect(contact).toBe(data['contacts'][0]);
    });
  });

});
