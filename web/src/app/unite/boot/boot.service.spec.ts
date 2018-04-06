import { TestBed, inject } from '@angular/core/testing';

import { BootService } from './boot.service';

describe('BootService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootService]
    });
  });

  it('should be created', inject([BootService], (service: BootService) => {
    expect(service).toBeTruthy();
  }));
});
