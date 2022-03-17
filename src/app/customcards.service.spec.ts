import { TestBed } from '@angular/core/testing';

import { CustomcardsService } from './customcards.service';

describe('CustomcardsService', () => {
  let service: CustomcardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomcardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
