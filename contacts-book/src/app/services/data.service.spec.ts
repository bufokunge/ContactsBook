import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { mockContactFactory } from "../contact.mocks";
import { Store, StoreModule } from "@ngrx/store";

import { ContactReducer } from "../contact.reducer";

describe('DataService', () => {
  let service: DataService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        StoreModule.forRoot({contacts: ContactReducer})
      ]
    }).compileComponents();

    store = TestBed.inject(Store)
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

  it('should add contact', () => {
    const mockContactPromise = mockContactFactory(1);

    return mockContactPromise.then(data => {
      const mockContact = data['contacts'][0];

      expect(service.contacts[mockContact.ssn]).toBeUndefined();

      service.addContact(mockContact);

      expect(service.contacts[mockContact.ssn]).toBeDefined();
      expect(service.contacts[mockContact.ssn]).toBe(mockContact);
    });
  });

  it('should not add improper contact', () => {
    expect(service.contacts).toEqual({});

    service.addContact(undefined);
    expect(service.contacts).toEqual({});

    service.addContact(null);
    expect(service.contacts).toEqual({});
  });

  it('should add contact array', () => {
    const number = 3;
    const mockContactPromise = mockContactFactory(number);

    return mockContactPromise.then(data => {
      const mockContacts = data['contacts'];

      service.addContactArray(mockContacts);

      expect(service.contacts).not.toEqual({});
      expect(Object.values(service.contacts).length).toBeGreaterThanOrEqual(number);

      mockContacts.forEach(mock => {
        expect(service.contacts[mock.ssn]).toBeDefined();
        expect(service.contacts[mock.ssn]).toBe(mock);
      });
    });
  });

  it('should not add improper contact array', () => {
    expect(service.contacts).toEqual({});

    service.addContactArray(undefined);
    expect(service.contacts).toEqual({});

    service.addContactArray(null);
    expect(service.contacts).toEqual({});

    service.addContactArray([]);
    expect(service.contacts).toEqual({});
  });

  it('should return correct amount of items per table page', () => {
    const pageSize = 7;
    const number = 16

    const mockContactPromise = mockContactFactory(number);

    return mockContactPromise.then(data => {
      const mockContacts = data['contacts'];

      mockContacts.forEach(contact => {
        service.contacts[contact.ssn] = contact;
      });

      let pageData = service.getPageData(0, pageSize);
      expect(pageData.length).toBe(number);
      expect(pageData.data.length).toBe(pageSize);
      expect(pageData.data).toEqual(Object.values(service.contacts).slice(0, pageSize));

      let lastPage = Math.floor(pageData.length / pageSize);
      pageData = service.getPageData(lastPage, pageSize);
      expect(pageData.length).toBe(number);
      expect(pageData.data.length).toBe(number % pageSize);
      expect(pageData.data).toEqual(Object.values(service.contacts).slice(pageSize * lastPage, pageData.length));
    });
  });

});
