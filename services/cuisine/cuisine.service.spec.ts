import { TestBed } from '@angular/core/testing';

import { CuisineService } from './cuisine.service';

describe('CuisineService', () => {
  let service: CuisineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuisineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
