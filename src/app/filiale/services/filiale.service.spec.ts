import { TestBed } from '@angular/core/testing';

import { FilialeService } from './filiale.service';

describe('FilialeService', () => {
  let service: FilialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
