import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceDetailsComponent } from './licence-details.component';

describe('LicenceDetailsComponent', () => {
  let component: LicenceDetailsComponent;
  let fixture: ComponentFixture<LicenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
