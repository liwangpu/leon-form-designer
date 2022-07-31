import { TestBed } from '@angular/core/testing';

import { DynamicComponentRegistryService } from './dynamic-component-registry.service';

describe('DynamicComponentRegistryService', () => {
  let service: DynamicComponentRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
