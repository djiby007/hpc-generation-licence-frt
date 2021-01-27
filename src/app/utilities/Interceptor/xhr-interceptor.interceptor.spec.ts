import { TestBed } from '@angular/core/testing';

import { XhrInterceptorInterceptor } from './xhr-interceptor.interceptor';

describe('XhrInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      XhrInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: XhrInterceptorInterceptor = TestBed.inject(XhrInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
