import { TestBed } from '@angular/core/testing';

import { ConsultoryService } from './consultory.service';

describe('ConsultoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultoryService = TestBed.get(ConsultoryService);
    expect(service).toBeTruthy();
  });
});
