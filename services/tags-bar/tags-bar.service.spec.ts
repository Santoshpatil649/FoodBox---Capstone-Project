import { TestBed } from '@angular/core/testing';

import { TagsBarService } from './tags-bar.service';

describe('TagsBarService', () => {
  let service: TagsBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
