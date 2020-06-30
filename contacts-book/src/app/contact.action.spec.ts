import * as Actions from './contact.action';
import { AddContact, AddContactArray } from "./contact.action";
import { mockContactFactory } from "./contact.mocks";

describe('ContactActions', () => {

  it('should create an AddContact action containing a contact', () => {

    const mockContactPromise = mockContactFactory(1);

    return mockContactPromise.then(data => {
      const mockContact = data['contacts'][0];

      const action = new AddContact(mockContact);

      expect({...action}).toEqual({
        type: Actions.ADD_CONTACT,
        payload: mockContact
      });
    });
  });

  it('should create an AddContactArray action containing multiple contacts', () => {

    const mockContactPromise = mockContactFactory(3);

    return mockContactPromise.then(data => {
      const mockContacts = data['contacts'];

      const action = new AddContactArray(mockContacts);

      expect({...action}).toEqual({
        type: Actions.ADD_CONTACT_ARRAY,
        payload: mockContacts
      });
    });
  });

});
