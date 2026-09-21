import { TestBed } from '@angular/core/testing';
import { GlobalFilters } from './global-filters.service';

describe('GlobalFilters', () => {
  let service: GlobalFilters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalFilters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
