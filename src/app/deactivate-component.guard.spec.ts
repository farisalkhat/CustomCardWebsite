import { TestBed } from '@angular/core/testing';

import { DeactivateComponentGuard } from './deactivate-component.guard';

describe('DeactivateComponentGuard', () => {
  let guard: DeactivateComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeactivateComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
