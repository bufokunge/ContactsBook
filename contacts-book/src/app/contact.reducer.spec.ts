import * as Reducer from './contact.reducer';
import * as Actions from './contact.action';
import { mockContactFactory } from "./contact.mocks";

describe('ContactReducer', () => {

  it('should return initial state', () => {
    const initialState = Reducer.initialState;
    const state = Reducer.ContactReducer(undefined, {type: null, payload: undefined});

    expect(state).toBe(initialState);
  });

  it('should add contact', () => {
    const initialState = Reducer.initialState;
    const mockContactPromise = mockContactFactory(1);

    return mockContactPromise.then(data => {
      const mockContact = data['contacts'][0];

      const action = new Actions.AddContact(mockContact);
      const state = Reducer.ContactReducer(initialState, action);

      expect(Object.keys(state).length).toBe(Object.keys(initialState).length + 1);
      expect(Object.keys(state)).toContain(mockContact.ssn + '');
      expect(state[mockContact.ssn]).toBe(mockContact);
    });
  });
});
