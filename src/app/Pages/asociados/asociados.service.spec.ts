import { TestBed } from '@angular/core/testing';

import { AsociadosService } from './asociados.service';

describe('AsociadosService', () => {
  let service: AsociadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsociadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
