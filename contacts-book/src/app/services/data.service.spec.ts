import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { provideMockStore } from "@ngrx/store/testing";
import { SimplifiedContact } from "../contact";

describe('DataService', () => {
  let service: DataService;
  const initialState: {[ssn: number]: SimplifiedContact} = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
      ],
        imports: []
    }).compileComponents();
    service = TestBed.inject(DataService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
